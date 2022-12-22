import { BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class CommonEntity extends BaseEntity {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
