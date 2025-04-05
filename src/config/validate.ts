import { Config, configSchema } from 'src/schemas/config.schema';

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

export function validate(raw: Record<string, unknown>) {
  const config: Config = {
    server: {
      nodeEnv: raw.NODE_ENV as string,
      host: raw.HOST as string,
      port: parseInt(raw.PORT as string),
    },
    mailer: {
      name: raw.MAILER_NAME as string,
      host: raw.MAILER_HOST as string,
      port: parseInt(raw.MAILER_PORT as string),
      secure: isTrue(raw.MAILER_SECURE as string),
      user: raw.MAILER_USER as string,
      pass: raw.MAILER_PASS as string,
    },
  };

  const parsedConfig = configSchema.parse(config);

  return parsedConfig;
}
