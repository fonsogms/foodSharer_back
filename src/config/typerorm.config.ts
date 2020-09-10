import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig = (): TypeOrmModuleOptions => {
  if (process.env.DATABASE_URL) {
    console.log('working?');
    console.log(process.env.DATABASE_URL, 'here gimme');
    return {
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [__dirname + '/../**/*.entity.js'],
      synchronize: true,
    };
  } else {
    return {
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'tito-1992',
      database: 'foodsharer',
      entities: [__dirname + '/../**/*.entity.js'],
      synchronize: true,
    };
  }
};
