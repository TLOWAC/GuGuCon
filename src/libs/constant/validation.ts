import Joi from 'joi';

const validationSchema = Joi.object({
	NODE_ENV: Joi.string().valid('local', 'dev', 'prod'),
	PORT: Joi.number().default(3000),
});

export { validationSchema };
