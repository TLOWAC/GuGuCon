import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
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
		stringColor: 'white',
		defaultIndentation: 4,
	};

	public intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const ctx = context.switchToHttp();
		this.request = ctx.getRequest<Request>();
		this.response = ctx.getResponse<Response>();

		this.loggingRequest();

		// :timestamp :method :url
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

	private loggingRequest() {
		const { originalUrl, method, params, query, body, headers } = this.request;
		// Logger.log(`
		// /* --------------------------------- 📭 Request -------------------------------- */
		// headers		: ${{ headers }}
		// path		: ${originalUrl}
		// method		: ${method}
		// params		: ${JSON.stringify(params)}
		// query		: ${JSON.stringify(query)}
		// body		: ${JSON.stringify(body)}
		// 		`);

		// Logger.log(`/* --------------------------------- 📭 Request -------------------------------- */`, {
		// 	timestamp: new Date().toISOString(),
		// 	originalUrl,
		// 	method,
		// 	params,
		// 	query,
		// 	body,
		// });

		Logger.log(
			`/* --------------------------------- 📭 Request -------------------------------- */`,
		);
		Logger.log(
			prettyjson.render(
				{
					timestamp: new Date().toISOString(),
					originalUrl,
					method,
					params,
					query,
					body,
					headers,
				},
				this.prettyJsonConfig,
			),
		);
	}

	private loggingResponse(data: any) {
		const { statusCode } = this.response;

		// Logger.log(`
		// /* --------------------------------- 📬 Response -------------------------------- */
		// statusCode	: ${statusCode}
		// data		: ${data}
		// 		`);

		Logger.debug(
			`/* --------------------------------- 📬 Response -------------------------------- */`,
		);
		Logger.log(
			prettyjson.render(
				{
					timestamp: new Date().toISOString(),
					statusCode,
					data,
				},
				this.prettyJsonConfig,
			),
		);
	}

	private loggingErrResponse(error: Error) {
		const statusCode =
			error instanceof HttpException ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
		const message = error instanceof HttpException ? error.message : 'Internal server error';

		const { url, method } = this.request;

		const errorResponse = {
			timestamp: new Date().toISOString(), // 에러 발생 시간
			statusCode, // 에러 코드
			path: url, // url 경로
			method, // http method 정보
			message, // 에러 메시지
		};

		// 에러 메시지 로그 출력
		Logger.error(
			prettyjson.render(errorResponse, this.prettyJsonConfig),
			error.stack,
			'ExceptionFilter',
		);
	}
}
