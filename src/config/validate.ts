import { Logger } from '@nestjs/common';
import { IConfig } from 'src/types/config';
import { validateConfig } from 'src/types/validations/config.validate';

const isTrue = (
  value: string | undefined,
  defaultValue: boolean = true,
): boolean => {
  if (value === 'true' || value === '1' || value === 'yes' || value === 'on')
    return true;
  if (value === 'false' || value === '0' || value === 'no' || value === 'off')
    return false;
  if (value === undefined) return defaultValue;
  throw new Error('Invalid boolean value');
};

const logger = new Logger();

export function validate(raw: Record<string, unknown>) {
  const config: IConfig = {
    mailer: {
      host: raw.MAILER_HOST as string,
      port: parseInt(raw.MAILER_PORT as string, 10),
      secure: isTrue(raw.MAILER_SECURE as string),
      auth: {
        user: raw.MAILER_USER as string,
        pass: raw.MAILER_PASS as string,
      },
    },
  };
  const result = validateConfig(config);
  if (result.success) {
    return config;
  }
  const errorPath = result.errors.map((error) => error.path).join(', ');
  logger.error(`Validation failed for ${errorPath}`);
  throw new Error('Config validation failed');
}
