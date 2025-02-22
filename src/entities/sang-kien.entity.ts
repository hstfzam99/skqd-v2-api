import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// Entities
import { BaseEntity } from './base/base.entity';

@Entity('sang_kien', { orderBy: { id: 'DESC' } })
export class SangKien extends BaseEntity {

  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ length: 255, nullable: false })
  title: string;

  @Column({ length: 255, nullable: false })
  author: string;
  
  @Column({ length: 255, nullable: false })
  thumb: string;

  @Column({ length: 255, nullable: false })
  sound: string;

  @Column({ default: false })
  isDeleted: boolean;

  toJSON() {
    delete this.isDeleted;
    return this;
  }

}
