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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '@@shared/guards/jwt-auth.guard';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('api/v1/user')
export class UserController {
        constructor(private readonly userService: UserService) {}

        @UseGuards(JwtAuthGuard)
        @ApiBearerAuth()
        @Get('profile')
        getProfile(@Request() req) {
                return req.user;
        }
}
