import {
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { Food } from 'src/food/food.entity';
import * as bcrypt from 'bcrypt';
@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  username: string;
  @Column()
  password: string;
  @Column()
  salt: string;
  @Column({ default: null })
  phone: string | null;
  @Column({ default: null })
  mail: string | null;
  @Column()
  address: string;
  @Column('float8')
  latitude: number;
  @Column('float8')
  longitude: number;

  @OneToMany(
    type => Food,
    food => food.owner,
    { eager: true },
  )
  food: Food[];
  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);

    return hash === this.password;
  }
}
