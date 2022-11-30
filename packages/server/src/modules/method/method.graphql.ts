import { MethodStatus } from '@app/methods';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';

import { AppGraphhQLContext } from '../../app.types';
import { UserEntity } from '../user/user.entity';
import {
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
    @Context() { req }: AppGraphhQLContext<{ user: UserEntity }>,
  ) {
    return MethodEntity.findBy({ userId: req.user.id });
  }

  @Query(() => MethodEntity)
  async method(
    @Args() { id }: MethodDto,
    @Context() { req }: AppGraphhQLContext<{ user: UserEntity }>,
  ) {
    return MethodEntity.findOneBy({ userId: req.user.id, id });
  }

  @Mutation(() => MethodEntity)
  async createMethod(
    @Args() { type }: CreateMethodDto,
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
    @Args() { data, id }: EditMethodDto,
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
    @Args() { id }: ArchieveMethodDto,
    @Context() { req }: AppGraphhQLContext<{ user: UserEntity }>,
  ) {
    const method = await MethodEntity.findOneByOrFail({
      userId: req.user.id,
      id,
    });

    method.status = MethodStatus.ARCHIEVED;

    return method.save();
  }
}
