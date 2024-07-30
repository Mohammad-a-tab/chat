import { DataSource } from 'typeorm';
import { resolve } from 'path';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'sqlite',
        database: 'chat',
        entities: [resolve('dist/**/*.entity.js')],
        migrations: [resolve('dist/migrations/*.js')],
        synchronize: false,
        logging: true,
        migrationsRun: true,
      });

      return dataSource.initialize();
    },
  },
];
