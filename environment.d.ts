declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GITHUB_AUTH_TOKEN: string
      NODE_ENV: 'development' | 'production'
      PORT?: string
      PWD: string
      DB_DIALECT: string
      DB_HOST: string
      DB_PORT: string
      DB_NAME: string
      DB_USER: string
      DB_PASSWORD: string
    }
  }
}

export {}
