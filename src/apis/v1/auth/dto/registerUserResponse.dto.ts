import { OmitType } from "@nestjs/swagger";

import { User } from "@/database/entities";

export class RegisterUserResponseDTO extends OmitType(User, ["password"] as const) {}
