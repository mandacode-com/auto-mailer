export interface IConfig {
  mailer: IMailerConfig;
}

export interface IMailerConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}
