import { Global, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { join } from "path";

import { MailService } from "./mail.service";

@Global()
@Module({
        imports: [
                MailerModule.forRootAsync({
                        imports: [ConfigModule],
                        inject: [ConfigService],
                        useFactory: (config: ConfigService) => ({
                                transport: {
                                        host: config.get("mail_host"),
                                        port: 465,
                                        secure: true,
                                        auth: {
                                                user: config.get("mail_user"), // 계정 이메일
                                                pass: config.get("mail_password"), // 계정 비밀번호
                                        },
                                        // tls: {
                                        //         rejectUnauthorized: false,
                                        // },
                                },
                                // defaults: {
                                //         from: `"No Reply" <${config.get("mail_from")}>`, // 발신자 정보 설정
                                // },
                                template: {
                                        dir: join(__dirname, "./templates"), // mail 템플릿 폴더 경로 설정
                                        adapter: new HandlebarsAdapter(), // handlebars 템플릿 엔진 설정
                                        options: {
                                                strict: true,
                                        },
                                },
                        }),
                }),
        ],
        providers: [MailService],
        exports: [MailService],
})
export class MailModule {}
