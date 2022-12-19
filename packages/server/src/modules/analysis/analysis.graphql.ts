import { AnalysisStatus, MethodStatus } from '@app/methods/types';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AppGraphhQLContext } from 'src/app.types';
import { MethodEntity } from '../method/method.entity';
import { UserEntity } from '../user/user.entity';
import { AnalysisEntity } from './analysis.entity';
import {
  AllAnalysesDto,
  AnalysisDto,
  ArchieveAnalysisDto,
  ComputeAnalysisDataDto,
  CreateAnalysisDto,
  UpdateAnalysisDataDto,
} from './dto';

@Resolver()
export class AnalysisResolver {
  @Query(() => [AnalysisEntity])
  async allAnalyses(
    @Context() context: AppGraphhQLContext<{ user: UserEntity }>,
    @Args('input') { filters }: AllAnalysesDto,
  ) {
    const {
      req: { user },
    } = context;

    const whereClause: { methodId?: number; status?: AnalysisStatus } =
      typeof filters?.methodId === 'number'
        ? { methodId: filters.methodId }
        : {};

    if (typeof filters?.status === 'number') {
      whereClause.status = filters.status;
    }

    return AnalysisEntity.findBy({
      userId: user.id,
      ...whereClause,
    });
  }

  @Query(() => AnalysisEntity)
  async analysis(
    @Context() context: AppGraphhQLContext<{ user: UserEntity }>,
    @Args('input') { id }: AnalysisDto,
  ) {
    const {
      req: { user },
    } = context;

    return AnalysisEntity.findOneByOrFail({
      id,
      userId: user.id,
    });
  }

  @Mutation(() => AnalysisEntity)
  async createAnalysis(
    @Context() context: AppGraphhQLContext<{ user: UserEntity }>,
    @Args('input') { name, methodId, details }: CreateAnalysisDto,
  ) {
    const {
      req: { user },
    } = context;

    const method = await MethodEntity.findOneByOrFail({
      id: methodId,
      status: MethodStatus.COMPLETED,
    });

    if (user.id !== method.userId) {
      throw new Error(
        `You has no rights to create analysis with current method`,
      );
    }

    const analysis = new AnalysisEntity();
    analysis.methodId = methodId;
    analysis.name = name;

    analysis.userId = user.id;
    analysis.status = AnalysisStatus.DRAFT;
    analysis.details = details;

    return analysis.save();
  }

  @Mutation(() => AnalysisEntity)
  async archieveAnalysis(
    @Context() context: AppGraphhQLContext<{ user: UserEntity }>,
    @Args('input') { id }: ArchieveAnalysisDto,
  ) {
    const {
      req: { user },
    } = context;

    const analysis = await AnalysisEntity.findOneByOrFail({
      id,
      userId: user.id,
    });

    if (analysis.status === AnalysisStatus.DRAFT) {
      return analysis.remove();
    }

    analysis.status = AnalysisStatus.ARCHIEVED;

    return analysis.save();
  }

  @Mutation(() => AnalysisEntity)
  async updateAnalysisData(
    @Context() context: AppGraphhQLContext<{ user: UserEntity }>,
    @Args('input') { id, data }: UpdateAnalysisDataDto,
  ) {
    const {
      req: { user },
    } = context;

    const analysis = await AnalysisEntity.findOneByOrFail({
      status: AnalysisStatus.DRAFT,
      userId: user.id,
      id,
    });

    analysis.data = data;

    return analysis.save();
  }

  @Mutation(() => AnalysisEntity)
  async computeAnalysisData(
    @Context() context: AppGraphhQLContext<{ user: UserEntity }>,
    @Args('input') { id }: ComputeAnalysisDataDto,
  ) {
    const {
      req: { user },
    } = context;

    const analysis = await AnalysisEntity.findOneOrFail({
      where: {
        status: AnalysisStatus.DRAFT,
        userId: user.id,
        id,
      },
      relations: {
        method: {
          brain: true,
        },
      },
    });

    if (analysis.data.length === 0) {
      throw new Error(`AnalysisData is missed`);
    }

    const net = analysis.method.brain.net;

    analysis.data = analysis.data.map((item) => ({
      ...item,
      result: net.run(item.color).concentration,
    }));
    analysis.status = AnalysisStatus.COMPLETED;

    return analysis.save();
  }
}
