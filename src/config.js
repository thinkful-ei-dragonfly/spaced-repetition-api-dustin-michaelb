module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DB_URL: process.env.DB_URL
    || 'postgresql://dunder-mifflin@localhost/spaced-repetition',
  JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret',
  JWT_EXPIRY: process.env.JWT_EXPIRY || '3h',
  PROD_MIGRATION_DB_HOST: process.env.PROD_MIGRATION_DB_HOST || 'ec2-107-22-222-161.compute-1.amazonaws.com',
  PROD_MIGRATION_DB_PORT: process.env.PROD_MIGRATION_DB_PORT || 5432,
  PROD_MIGRATION_DB_NAME: process.env.PROD_MIGRATION_DB_NAME || 'dffvhktdm689ca',
  PROD_MIGRATION_DB_USER: process.env.PROD_MIGRATION_DB_USER || 'bmmxmdapfqvgmw',
  PROD_MIGRATION_DB_PASS: process.env.PROD_MIGRATION_DB_PASS || '362835a76112a20a4958a0b12a65352002a06aacbc0c67669ec277cd55baee4d',
}
