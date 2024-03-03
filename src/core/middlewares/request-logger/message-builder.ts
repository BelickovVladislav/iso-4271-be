import type { Request } from 'express';

export class MessageBuilder {
  private static _instance: MessageBuilder;
  private _message = '';
  private _request: Request;

  static get instance(): MessageBuilder {
    if (!this._instance) {
      this._instance = new MessageBuilder();
    }

    return this._instance;
  }

  set request(request: Request) {
    this._message = '';

    this._request = request;
  }

  addRequestMethod(): MessageBuilder {
    this._message += `${this._request.method} request: `;

    return this;
  }

  addRoutePath(): MessageBuilder {
    this._message += `route - ${this._request.baseUrl}, `;

    return this;
  }

  addHost(): MessageBuilder {
    this._message += `host - ${this._request.hostname}`;

    return this;
  }

  addQueryParams(): MessageBuilder {
    const { query } = this._request;

    if (Object.keys(query).length) {
      this._message += `\n query params - ${JSON.stringify(query, null, 2)}`;
    }

    return this;
  }

  addBody(): MessageBuilder {
    const { body } = this._request;

    if (Object.keys(body).length) {
      this._message += `\n body - ${JSON.stringify(body, null, 2)}`;
    }

    return this;
  }

  build(): string {
    return this._message.trim();
  }
}
