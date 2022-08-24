import { Logger } from '@nestjs/common';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const ctx = context.switchToHttp();
		const request = ctx.getRequest<Request>();
		const response = ctx.getResponse<Response>();

		const { originalUrl, method, params, query, body } = request;
		const { statusCode: statusCodeResponse } = response;

		const loggingRequest = () => {
			Logger.log(`
	/* --------------------------------- 📭 Request -------------------------------- */
	path		: ${originalUrl} 
	method		: ${method}
	params		: ${JSON.stringify(params)} 
	query		: ${JSON.stringify(query)} 
	body		: ${JSON.stringify(body)} 
			`);
		};

		loggingRequest();

		const loggingResponse = (data) => {
			Logger.log(`
	/* --------------------------------- 📬 Response -------------------------------- */
	statusCode	: ${statusCodeResponse} 
	data		: ${data}
			`);
		};

		next.handle().pipe(
			tap({
				next(value) {
					console.log('asdfasdfasdf', value);
				},
			}),
		);
		return next.handle().pipe(tap((data) => loggingResponse(data)));
	}
}
