import { MethodStatus } from '@app/methods';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';

import { AppGraphhQLContext } from '../../app.types';
import { UserEntity } from '../user/user.entity';
import {
  AllMethodsDto,
  ArchieveMethodDto,
  CreateMethodDto,
  EditMethodDto,
  MethodDto,
} from './dto';
import { MethodEntity } from './method.entity';

@Resolver()
export class MethodResolver {
  @Query(() => [MethodEntity])
  async allMethods(
    @Args('input') { filters }: AllMethodsDto,
    @Context() { req }: AppGraphhQLContext<{ user: UserEntity }>,
  ) {
    const whereClause =
      typeof filters?.status === 'number' ? { status: filters.status } : {};

    return MethodEntity.findBy({ userId: req.user.id, ...whereClause });
  }

  @Query(() => MethodEntity)
  async method(
    @Args('input') { id }: MethodDto,
    @Context() { req }: AppGraphhQLContext<{ user: UserEntity }>,
  ) {
    return MethodEntity.findOneBy({ userId: req.user.id, id });
  }

  @Mutation(() => MethodEntity)
  async createMethod(
    @Args('input') { type }: CreateMethodDto,
    @Context() { req }: AppGraphhQLContext<{ user: UserEntity }>,
  ) {
    const method = new MethodEntity();

    method.type = type;
    method.status = MethodStatus.DRAFT;
    method.userId = req.user.id;

    return method.save();
  }

  @Mutation(() => MethodEntity)
  async editMethod(
    @Args('input') { data, id }: EditMethodDto,
    @Context() { req }: AppGraphhQLContext<{ user: UserEntity }>,
  ) {
    const method = await MethodEntity.findOneByOrFail({
      userId: req.user.id,
      id,
    });

    method.data = data;

    return method.save();
  }

  @Mutation(() => MethodEntity)
  async archieveMethod(
    @Args('input') { id }: ArchieveMethodDto,
    @Context() { req }: AppGraphhQLContext<{ user: UserEntity }>,
  ) {
    const method = await MethodEntity.findOneByOrFail({
      userId: req.user.id,
      id,
    });

    if (method.status === MethodStatus.DRAFT) {
      return method.remove();
    }

    method.status = MethodStatus.ARCHIEVED;

    return method.save();
  }
}
