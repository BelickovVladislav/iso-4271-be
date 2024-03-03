import type { Request, Response } from 'express';
import {
  type ArgumentsHost,
  BadRequestException,
  Catch,
  type ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

import type {
  IAppExceptionFilterResponse,
  IResponseWithErrorMessage,
} from './models';

@Catch(Error)
export class AppExceptionFilter implements ExceptionFilter {
  private readonly _logger: Logger = new Logger(AppExceptionFilter.name);

  catch(exception: Error, host: ArgumentsHost): Promise<void> | void {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const { statusCode, message, path, timestamp } =
      AppExceptionFilter._createResponsePayload(exception, request);

    exception.stack
      ? this._logger.error(path, exception.stack)
      : this._logger.error(
          `Date: ${timestamp} - Status: ${statusCode} - Message: ${message} - Url: ${path}`,
        );

    response.status(statusCode).send({
      statusCode,
      message,
      timestamp,
      path,
    });
  }

  private static _createResponsePayload(
    exception: Error,
    req: Request,
  ): IAppExceptionFilterResponse {
    return {
      ...this._apiError(exception),
      timestamp: new Date().toISOString(),
      path: req.url,
    };
  }

  private static _getCurrentErrorMessage(exception: HttpException): string {
    let message = exception.message;
    const responseHasMessage = (
      value: string | object,
    ): value is IResponseWithErrorMessage =>
      typeof value === 'object' && value !== null && 'message' in value;

    if (exception instanceof BadRequestException) {
      const response = exception.getResponse();

      if (responseHasMessage(response)) {
        message = response.message;

        exception.message = Array.isArray(response.message)
          ? this._convertArrayOfErrors(response.message)
          : response.message;
      }
    }

    return message;
  }

  private static _convertArrayOfErrors(errors: unknown[]): string {
    const isStringErrors = errors.every(
      (error: unknown) => typeof error === 'string',
    );

    return isStringErrors ? errors.join('; ') : JSON.stringify(errors, null, 2);
  }

  private static _apiError(
    exception: Error,
  ): Pick<IAppExceptionFilterResponse, 'statusCode' | 'message'> {
    return {
      statusCode:
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR,
      message:
        exception instanceof HttpException
          ? this._getCurrentErrorMessage(exception)
          : 'Internal server error',
    };
  }
}
