import { environments } from "eslint-plugin-prettier";

export const appConfig = () => ({
    environment: process.env.NODE_ENV || 'production',
    database: {
        host: process.env.DATABASE_HOST || 'localhost',
        port: +process.env.DATABASE_PORT || 5432,
        username: process.env.DATABASE_USER || 'postgres',
        password: process.env.DATABASE_PASSWORD || 'pg123',
        name: process.env.DATABASE_NAME,
        synchronize: process.env.DATABASE_SYNCHRONIZE === 'true' ? true : false,
        autoLoadEntities: process.env.DATABASE_AUTO_LOAD_ENTITIES === 'true' ? true : false,
    },

})