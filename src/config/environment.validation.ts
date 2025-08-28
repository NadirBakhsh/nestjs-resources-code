import * as Joi from 'joi';

export default Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'staging')
    .default('development'),
  DATABASE_PORT: Joi.number().port().default(5432),
  DATABASE_USER: Joi.string(),
  DATABASE_PASSWORD: Joi.string(),
  DATABASE_HOST: Joi.string(),
  DATABASE_NAME: Joi.string(),
  DATABASE_SYNCHRONIZE: Joi.boolean().default(true),
  DATABASE_AUTO_LOAD_ENTITIES: Joi.boolean().default(true),
  PROFILE_API_KEY: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_TOKEN_AUDIENCE: Joi.string().required(),
  JWT_TOKEN_ISSUER: Joi.string().required(),
  JWT_ACCESS_TOKEN_TTL: Joi.string().required(),
});
