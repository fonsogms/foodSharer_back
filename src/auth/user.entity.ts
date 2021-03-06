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
import { UserAuthDto } from './dto/userAuth.dto';
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
  @Column({ default: '' })
  phone: string;
  @Column({ default: '' })
  mail: string;
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
  async changePassword(userAuthDto: UserAuthDto) {
    const { username, password } = userAuthDto;
    const salt = await bcrypt.genSalt();
    this.username = username;
    this.password = await bcrypt.hash(password, salt);
    this.salt = salt;
    await this.save();
  }
}
