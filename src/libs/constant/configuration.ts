function configuration() {
        return {
                environment: process.env.NODE_ENV,
                port: process.env.PORT,
                db_host: process.env.DATABASE_HOST,
                db_port: process.env.DATABASE_PORT,
                db_user: process.env.DATABASE_USERNAME,
                db_password: process.env.DATABASE_PASSWORD,
                db_name: process.env.DATABASE_NAME,
                db_sync: process.env.DATABASE_SYNC,
        };
}

export { configuration };
