import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator((data, ctx: ExecutionContext) => {
        /**
         * 1. Request 에 담긴 정보를 가져온다.
         * 2. 그중에서 UsesGuard(AuthGuard) 를 통과하여 얻게된 user 정보를 가져온다.
         */
        const req = ctx.switchToHttp().getRequest();
        return req.user;
});
