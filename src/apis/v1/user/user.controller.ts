import {
        Body,
        Controller,
        Delete,
        Get,
        Param,
        Patch,
        Post,
        Request,
        UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '@@shared/guards/jwt-auth.guard';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
        constructor(private readonly userService: UserService) {}
        @UseGuards(JwtAuthGuard)
        @Get('profile')
        getProfile(@Request() req) {
                return req.user;
        }
}
