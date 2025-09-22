import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/user.entity';

@Injectable()
export class MailService {
    constructor(
        private readonly mailerService: MailerService,
    ) {}

    public async sendUserWelcomeEmail(user: User): Promise<void> {
        await this.mailerService.sendMail({
            to: user.email,
            from: 'Onboarding Team <kKlOJ@example.com>',
            subject: 'Welcome to the App! Confirm your Email',
            template: './welcome', 
            context: {
                name: user.firstName,
                email: user.email,
                loginUrl: 'http://localhost:3000',
            },
        })
    }


}
