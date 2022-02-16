export const nestEnvConfiguration = () => envTransformer(process.env);

export const envTransformer = (envs: any) => ({
    DATABASE_URL: envs.DATABASE_URL,
    JWT_SECRET_KEY: envs.JWT_SECRET_KEY,
    PORT: envs.PORT
});
