import type { EnvConfig } from '@stacksjs/env'
import { validate } from '@stacksjs/validation'

/**
 * **Env Configuration & Validations**
 *
 * This configuration defines all of your Env validations. Because Stacks is fully-typed, you
 * may hover any of the options below and the definitions will be provided. In case you
 * have any questions, feel free to reach out via Discord or GitHub Discussions.
 */
export default {
  APP_NAME: validate.string(),
  APP_ENV: validate.enum(['development', 'staging', 'production']),
  APP_KEY: validate.string(),
  APP_URL: validate.string(),
  APP_PORT: validate.number(),
  DEBUG: validate.boolean(),

  API_PREFIX: validate.string(),
  DOCS_PREFIX: validate.string(),

  DB_CONNECTION: validate.enum(['mysql', 'sqlite', 'postgres', 'planetscale']),
  DB_HOST: validate.string(),
  DB_PORT: validate.number(),
  DB_DATABASE: validate.string(),
  DB_USERNAME: validate.string(),
  DB_PASSWORD: validate.string(),

  AWS_ACCOUNT_ID: validate.string(),
  AWS_ACCESS_KEY_ID: validate.string(),
  AWS_SECRET_ACCESS_KEY: validate.string(),
  AWS_DEFAULT_REGION: validate.string(),
  AWS_DEFAULT_PASSWORD: validate.string(),

  MAIL_MAILER: validate.enum(['smtp', 'mailgun', 'ses', 'postmark', 'sendmail', 'log']),
  MAIL_HOST: validate.string(),
  MAIL_PORT: validate.number(),
  MAIL_USERNAME: validate.string(),
  MAIL_PASSWORD: validate.string(),
  MAIL_ENCRYPTION: validate.string(),
  MAIL_FROM_NAME: validate.string(),
  MAIL_FROM_ADDRESS: validate.string(),

  SEARCH_ENGINE_DRIVER: validate.enum(['meilisearch', 'algolia', 'typesense']),
  MEILISEARCH_HOST: validate.string(),
  MEILISEARCH_KEY: validate.string(),

  FRONTEND_APP_ENV: validate.enum(['development', 'staging', 'production']),
  FRONTEND_APP_URL: validate.string(),
} satisfies EnvConfig
