import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthenticationModule } from '@project/authentication';
import { AccountConfigModule, getMongooseOptions } from '@project/account-config';

import { BlogUserModule } from '@project/blog-user';

@Module({
  imports: [
    AuthenticationModule,
    AccountConfigModule,
    BlogUserModule,
    MongooseModule.forRootAsync(
      getMongooseOptions()
    )
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
