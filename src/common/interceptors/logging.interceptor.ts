import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import chalk from 'chalk';
import { Request, Response } from 'express';
import prettyjson, { RendererOptions } from 'prettyjson';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
	private request: Request;
	private response: Response;
	private prettyJsonConfig: RendererOptions = {
		keysColor: 'rainbow',
		dashColor: 'magenta',
		// stringColor: 'white',
		defaultIndentation: 4,
	};

	/**
	 * 사용자 요청 전/후 실행
	 * @param context Interface describing details about the current request pipeline.
	 * @param next Interface providing access to the response stream.
	 */
	public intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const ctx = context.switchToHttp();
		this.request = ctx.getRequest<Request>();
		this.response = ctx.getResponse<Response>();

		this.loggingRequest();

		return next.handle().pipe(
			tap({
				next: (value) => {
					this.loggingResponse(value);
				},
				error: (err: Error) => {
					this.loggingErrResponse(err);
				},
			}),
		);
	}

	/**
	 * request 로그 출력
	 */
	private loggingRequest() {
		const { originalUrl, method, params, query, body, headers } = this.request;
		const reqFormat = {
			timestamp: new Date().toISOString(),
			originalUrl,
			method,
			params,
			query,
			body,
			headers,
		};

		Logger.log(
			chalk.blue(
				`/* --------------------------------- 📭 Request -------------------------------- */`,
			),
		);
		Logger.log(prettyjson.render(reqFormat, this.prettyJsonConfig));
	}

	/**
	 * response 로그 출력
	 * @param data response data
	 */
	private loggingResponse(data: any) {
		const { statusCode } = this.response;

		const resFormat = {
			timestamp: new Date().toISOString(),
			statusCode,
			data,
		};

		Logger.log(
			chalk.green(
				`/* --------------------------------- 📬 Response -------------------------------- */`,
			),
		);
		Logger.log(prettyjson.render(resFormat, this.prettyJsonConfig));
	}

	/**
	 * 에러 로그 출력
	 * @param error Error Object
	 */
	private loggingErrResponse(error: Error) {
		const statusCode =
			error instanceof HttpException ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
		const message = error instanceof HttpException ? error.message : 'Internal server error';

		const { url, method } = this.request;

		const errFormat = {
			timestamp: new Date().toISOString(), // 에러 발생 시간
			statusCode, // 에러 코드
			path: url, // url 경로
			method, // http method 정보
			message, // 에러 메시지
			exceptionStack: chalk.red(error.stack),
		};

		Logger.error(
			chalk.redBright(
				`/* --------------------------------- 📮 Response -------------------------------- */`,
			),
		);
		Logger.error(prettyjson.render(errFormat, this.prettyJsonConfig));
	}
}
