import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
	HttpStatus,
	Logger,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const request = ctx.getRequest(); // http request 객체 반환
		const response = ctx.getResponse(); // http response 객체 반환

		const statusCode =
			exception instanceof HttpException
				? exception.getStatus()
				: HttpStatus.INTERNAL_SERVER_ERROR;
		const message =
			exception instanceof HttpException ? exception.message : 'Internal server error';

		const errorResponse = {
			statusCode, // 에러 코드
			timestamp: new Date().toISOString(), // 에러 발생 시간
			path: request.url, // url 경로
			method: request.method, // http method 정보
			message, // 에러 메시지
		};

		// 에러 메시지 로그 출력
		Logger.error(`${request.url} ${request.method}`, exception.stack, 'ExceptionFilter');

		// 에러 메시지 반환
		response.status(statusCode).json(errorResponse);
	}
}
