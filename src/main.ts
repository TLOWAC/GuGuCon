import { INestApplication } from '@nestjs/common';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import { AppModule } from './app.module';
import { awesomeCli } from './configs/cli';
import { Swagger } from './configs/swagger';

class ExpressServer {
	app: INestApplication;
	config: ConfigService;
	swagger: Swagger;

	constructor() {
		///
	}

	private pipeBuild() {
		this.app.useGlobalPipes(
			new ValidationPipe({
				whitelist: true,
				forbidNonWhitelisted: true,
			}),
		);
	}

	private middlewareBuild() {
		this.app.use(morgan('combined'));
		this.app.use(cookieParser());
	}

	private documentBuild() {
		this.swagger.pageSetup();
	}

	public async setup() {
		this.app = await NestFactory.create(AppModule);
		this.config = this.app.get(ConfigService);
		this.swagger = new Swagger(this.app);

		this.pipeBuild();
		this.middlewareBuild();
		this.documentBuild();
	}

	public async start() {
		await this.app.listen(3030, () => {
			Logger.log(`server running on http://localhost:${this.config.get('PORT')}`);
			Logger.log(`swagger running on http://localhost:${this.config.get('PORT')}/docs`);
			Logger.log(`Running in ${this.config.get('environment')} mode`);
			Logger.log(awesomeCli());
		});
	}
}

async function main() {
	const expressServer = new ExpressServer();
	await expressServer.setup();
	await expressServer.start();
}

main();
