import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: 'tito-1992',
  database: 'foodsharer',
  entities: [__dirname + '/../**/*.entity.js'],
  synchronize: true,
};
