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
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { User } from "@/database/entities";
import { JwtAuthGuard } from "@/shared/guards/jwt-auth.guard";

import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserService } from "./user.service";

@ApiTags("User")
@Controller()
export class UserController {
        constructor(private readonly userService: UserService) {}

        @UseGuards(JwtAuthGuard)
        @ApiBearerAuth()
        @Get("profile")
        getProfile(@Request() req) {
                const { username } = req.user as User;
                return this.userService.findUserByEmail({ username });
        }
}
