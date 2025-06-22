import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

import { Post, RabbitRouting } from '@project/core';
import { rabbitConfig } from '@project/account-config';

@Injectable()
export class NotifyService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY)
    private readonly rabbitOptions: ConfigType<typeof rabbitConfig>
  ) { }

  public async notifyNewPosts(posts: Post[]) {
    return this.rabbitClient.publish(
      this.rabbitOptions.exchange,
      RabbitRouting.NewPostsPublished,
      { type: RabbitRouting.NewPostsPublished, posts: posts }
    );
  }
}
