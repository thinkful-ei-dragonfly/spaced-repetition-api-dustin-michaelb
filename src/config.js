module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DB_URL: process.env.DB_URL
    || 'postgresql://dunder-mifflin@localhost/spaced-repetition',
  JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret',
  JWT_EXPIRY: process.env.JWT_EXPIRY || '3h',
  PROD_MIGRATION_DB_HOST: process.env.PROD_MIGRATION_DB_HOST || 'ec2-107-20-198-176.compute-1.amazonaws.com',
  PROD_MIGRATION_DB_PORT: process.env.PROD_MIGRATION_DB_PORT || 5432,
  PROD_MIGRATION_DB_NAME: process.env.PROD_MIGRATION_DB_NAME || 'deia8raf4e0v97',
  PROD_MIGRATION_DB_USER: process.env.PROD_MIGRATION_DB_USER || 'yhuedcupaiugrr',
  PROD_MIGRATION_DB_PASS: process.env.PROD_MIGRATION_DB_PASS || '18315eeb5eee30ee80287e15420fcc6334cb10e1802cf5dcf4a6f8b258e30942',
}
