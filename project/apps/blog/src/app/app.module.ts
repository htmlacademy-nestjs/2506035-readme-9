import { Module } from '@nestjs/common';

import { BlogPostModule } from '@project/blog-post';
import { BlogCommentModule } from '@project/blog-comment';
import { BlogConfigModule } from '@project/blog-config';

@Module({
  imports: [
    BlogPostModule,
    BlogCommentModule,
    BlogConfigModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
