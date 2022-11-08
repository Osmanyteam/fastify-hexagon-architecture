import * as dotenv from 'dotenv';
dotenv.config();

const keys = {
  env: process.env['ENV'],
  passphrase: process.env['PASSPHRASE'],
  expirationAccessToken: process.env['EXPIRATION_ACCESS_TOKEN'],
  expirationRefreshToken: process.env['EXPIRATION_REFRESH_TOKEN'],
  mysql: {
    user: process.env['MYSQL_USER'],
    pwd: process.env['MYSQL_PWD'],
    host: process.env['MYSQL_HOST'],
    port: Number(process.env['MYSQL_PORT']),
    db: process.env['MYSQL_DB'],
  },
};

interface Keys {
  env: 'development' | 'staging' | 'production';
  passphrase: string;
  expirationAccessToken: number,
  expirationRefreshToken: number,
  mysql: {
    user: string;
    pwd: string;
    host: string;
    port: number;
    db: string;
  };
}

const getSanitizedConfig = (config: typeof keys): Keys => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config as unknown as Keys;
};

export default getSanitizedConfig(keys);
