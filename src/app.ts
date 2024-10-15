import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ReviewModule } from './modules/review/review.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { appConfig } from './config/app.config';
import { dbConfig } from './config/db.config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, dbConfig],
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('db.url'),
      }),
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "1234",
      database: "typeorm",
      synchronize: true,
      entities: [],
      autoLoadEntities: true
    }),
    UserModule,
    ReviewModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
