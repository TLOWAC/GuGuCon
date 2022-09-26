import { PickType } from "@nestjs/swagger";

import { User } from "@/database/entities";

export class RegisterUserRequestDTO extends PickType(User, ["username", "password"] as const) {}
