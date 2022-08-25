import Joi from 'joi';

const validationSchema = Joi.object({
        NODE_ENV: Joi.string().valid('local', 'dev', 'prod'),
        PORT: Joi.number().default(3000),
        DB_HOST: Joi.string(),
        DB_PORT: Joi.string(),
        DB_PASSWORD: Joi.string(),
        DB_USERNAME: Joi.string(),
        DB_NAME: Joi.string(),
        DB_SYNC: Joi.string(),
});

export { validationSchema };
