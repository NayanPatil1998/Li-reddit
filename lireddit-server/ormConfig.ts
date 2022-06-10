import { TypeOrmModuleOptions } from '@nestjs/typeorm';


const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  // url: process.env.DATABASE_URL,
  database: 'lireddit2',
  username: 'nayan',
  password: "9604",
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
