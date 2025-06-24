import { Inject, Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { ConfigType } from '@nestjs/config';

import { RabbitRouting } from '@project/core';
import { rabbitConfig } from '@project/account-config';

import { CreateSubscriberDto } from './dto/create-subscriber.dto';

@Injectable()
export class NotifyService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY)
    private readonly rabbitOptions: ConfigType<typeof rabbitConfig>,
  ) { }

  public async registerSubscriber(dto: CreateSubscriberDto) {
    return this.rabbitClient.publish(
      this.rabbitOptions.exchange,
      RabbitRouting.SubscriberCreated,
      { type: RabbitRouting.SubscriberCreated, subscriber: dto }
    );
  }
}
