import {Injectable, OnModuleDestroy, OnModuleInit,} from '@nestjs/common';

import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {

  private readonly redisUrl: string;
  private client: RedisClientType;

  constructor() {
    this.redisUrl = process.env.REDIS_URL!;

    this.client = createClient({
      url: this.redisUrl,
    });

    this.client.on('error', (error) => {
      console.error('❌ Redis Error:', error);
    });
  }

  async onModuleInit() {
    try {
      await this.client.connect();

      console.log(' Redis Connected Successfully!');
    } catch (error) {
      console.error(' Redis Connection Failed:', error);
    }
  }

  async onModuleDestroy() {
    if (this.client.isOpen) {
      await this.client.quit();
    }
  }

  getClient() {
    return this.client;
  }
}