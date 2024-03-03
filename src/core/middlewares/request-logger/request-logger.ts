import type { Request, Response } from 'express';
import { Injectable, Logger, type NestMiddleware } from '@nestjs/common';

import { MessageBuilder } from './message-builder';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private _messageBuilder: MessageBuilder = MessageBuilder.instance;

  use(req: Request, _res: Response, next: () => void): void {
    this._messageBuilder.request = req;

    const message = this._messageBuilder
      .addRequestMethod()
      .addRoutePath()
      .addHost()
      .addQueryParams()
      .addBody()
      .build();

    Logger.verbose(message);

    next();
  }
}
