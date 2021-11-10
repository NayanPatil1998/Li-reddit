import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  database: 'lireddit',
  username: 'postgres',
  logging: true,
  synchronize: false,
  entities: ['dist/src/**/entities/*.entity.js'],
  autoLoadEntities: true,
  migrations: ['./dist/src/db/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: './src/db/migrations',
  },
};

export default ormConfig;
