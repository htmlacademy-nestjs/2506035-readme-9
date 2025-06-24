import { Controller } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

import { RabbitRouting, Post } from '@project/core';

import { EmailSubscriberService } from './email-subscriber.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { MailService } from './mail-module/mail.service';

@Controller()
export class EmailSubscriberController {
  constructor(
    private readonly subscriberService: EmailSubscriberService,
    private readonly mailService: MailService
  ) { }

  @RabbitSubscribe({
    exchange: 'readme.notify',
    routingKey: RabbitRouting.SubscriberCreated,
    queue: 'readme.notify.income',
  })
  public async create(data: { type: string; subscriber: CreateSubscriberDto }) {
    if (data?.type !== RabbitRouting.SubscriberCreated) {
      return;
    };

    await this.subscriberService.addSubscriber(data.subscriber);
    await this.mailService.sendNotifyNewSubscriber(data.subscriber);
  }

  @RabbitSubscribe({
    exchange: 'readme.notify',
    routingKey: RabbitRouting.NewPostsPublished,
    queue: 'readme.notify.income',
  })
  public async notifyNewPosts(data: { type: string; posts: Post[] }) {
    if (data?.type !== RabbitRouting.NewPostsPublished) {
      return;
    };

    const subscribers = await this.subscriberService.getAllSubscribers();

    for (const subscriber of subscribers) {
      await this.mailService.sendNotifyNewPosts(
        data?.posts,
        subscriber.toPOJO()
      );
    }
  }
}
