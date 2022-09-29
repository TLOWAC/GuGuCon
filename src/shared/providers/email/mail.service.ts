import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class MailService {
        constructor(private mailerService: MailerService) {}

        // * 회원가입 > 유저 이메일 검증
        async confirmEmail(confirmCode: string, username: string) {
                const ret = await this.mailerService.sendMail({
                        to: "test@nestjs.com",
                        from: "noreply@nestjs.com",
                        subject: "user email confirm",
                        template: "confirmUserEmail", // The `.pug`, `.ejs` or `.hbs` extension is appended automatically.
                        context: {
                                // Data to be sent to template engine.
                                code: confirmCode,
                                username: username,
                        },
                });
                console.log("ret:", ret);
        }

        // * 회원가입 > 유저 이메일 검증
        // async resetPassword(username: string, passwordCode: string) {
        async resetPassword({ temporaryPassword }: { temporaryPassword: string }) {
                try {
                        const ret = await this.mailerService.sendMail({
                                to: "test@nestjs.com",
                                from: "noreply@nestjs.com",
                                subject: "reset password email",
                                template: "resetPassword", // The `.pug`, `.ejs` or `.hbs` extension is appended automatically.
                                // attachments: [
                                //         {
                                //                 filename: "text2.txt",
                                //                 content: new Buffer("hello world!", "utf-8"),
                                //         },
                                // ],
                                context: {
                                        temporaryPassword: temporaryPassword,
                                },
                        });
                        console.log("ret:", ret);
                        return ret;
                } catch (error) {
                        console.log("error:", error);
                }
        }
}
