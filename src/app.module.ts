import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { BullModule } from '@nestjs/bull';
import { ConfigModule } from '@nestjs/config';
import { TransactionsModule } from './transactions/transactions.module';
import { CreatorsModule } from './creators/creators.module';
import CreatorsResource from './creators/CreatorsResource';
import TransactionsResource from './transactions/TransactionsResource';
import TransactionsFileResource from './transactions/transactions-file/TransactionsFileResource';
import UsersResource from './users/UsersResource';
import locale from './locales/locales';
import { ScheduleModule } from '@nestjs/schedule';

const { AdminModule } = require('@adminjs/nestjs');

const AdminJS = require('adminjs');
const AdminJSSequelize = require('@adminjs/sequelize');
AdminJS.default.registerAdapter({
  Resource: AdminJSSequelize.Resource,
  Database: AdminJSSequelize.Database,
});

const DEFAULT_ADMIN = {
  email: process.env.ADMINJS_EMAIL,
  password: process.env.ADMINJS_PASS,
};

const authenticate = async (email: string, password: string) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN);
  }
  return null;
};

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadModels: true,
      synchronize: true,
    }),
    AdminModule.createAdminAsync({
      useFactory: () => ({
        adminJsOptions: {
          rootPath: '/admin',
          resources: [
            CreatorsResource,
            TransactionsResource,
            TransactionsFileResource,
            UsersResource,
          ],
          branding: {
            companyName: 'ACME Corporation',
          },
          ...locale,
        },
        auth: {
          authenticate,
          cookieName: 'adminjs',
          cookiePassword: 'secret',
        },
        sessionOptions: {
          resave: true,
          saveUninitialized: true,
          secret: 'secret',
        },
      }),
    }),
    UsersModule,
    TransactionsModule,
    CreatorsModule,
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
      },
    }),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
