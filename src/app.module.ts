import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import {join} from 'path';
import { UserModule } from './users/modules/user.module';

import { AuthModule } from './auth/modules/auth.module';
import { AuthController } from './auth/auth.controller';

import { TopicModule } from './topics/modules/topics.modules';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [join(process.cwd(), 'dist/**/*.entity.js')],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),

     UserModule, AuthModule, TopicModule

],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}

