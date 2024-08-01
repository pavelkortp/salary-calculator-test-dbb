import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StaffTypes } from '../constants';

@Entity('staff')
export class StaffMember {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  joinDate: Date;

  @Column()
  baseSalary: number;

  @Column()
  position: StaffTypes;

  @ManyToMany(() => StaffMember, (staff) => staff.subordinates)
  @JoinTable({
    name: 'supervisors_subordinates',
    joinColumn: {
      name: 'supervisor_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'subordinate_id',
      referencedColumnName: 'id',
    },
  })
  subordinates: StaffMember[];
}
