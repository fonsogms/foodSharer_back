import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig = (): TypeOrmModuleOptions => {
  if (process.env.DATABASE_URL) {
    return {
      type: 'postgres',
      url: process.env.DATABASE_URL,
      /*   host: 'ec2-52-30-161-203.eu-west-1.compute.amazonaws.com',
      database: 'd7go4np2upmo0u',
      username: 'ptvdcukdnbrbyd',
      password:
        '339856c1cd0e584e15cc3a2ddb7d43229a127183631d93ffae6563116f3951b3',
      port: 5432,
 */
      entities: [__dirname + '/../**/*.entity.js'],
      synchronize: true,
    };
  } else {
    // gets your default configuration
    // you could get a specific config by name getConnectionOptions('production')
    // or getConnectionOptions(process.env.NODE_ENV)
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
