import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

export class Swagger {
	app: INestApplication;
	document: OpenAPIObject;

	constructor(app: INestApplication) {
		this.app = app;
	}
	build() {
		const options = new DocumentBuilder()
			.setTitle('NestJS Realworld Example App')
			.setDescription('The Realworld API description')
			.setVersion('1.0')
			.addBearerAuth()
			.build();

		const document = SwaggerModule.createDocument(this.app, options);
		this.document = document;
	}

	setup() {
		SwaggerModule.setup('/docs', this.app, this.document);
	}
}
