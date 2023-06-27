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
import { User } from './users/entities/user.entity';

const { AdminModule } = require('@adminjs/nestjs');

const AdminJS = require('adminjs');
const AdminJSSequelize = require('@adminjs/sequelize');
AdminJS.default.registerAdapter({
  Resource: AdminJSSequelize.Resource,
  Database: AdminJSSequelize.Database,
});

const authenticate = async (email: string, password: string) => {
  const user = await User.findOne({ where: { email } });

  if (user && (await user.checkPassword(password))) {
    return user;
  }

  return false;
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
            withMadeWithLove: false,
            logo: false,
          },
          ...locale,
        },
        auth: {
          authenticate,
          cookieName: 'acmecorporation',
          cookiePassword: process.env.SECRET,
        },
        sessionOptions: {
          resave: true,
          saveUninitialized: true,
          secret: process.env.SECRET,
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
