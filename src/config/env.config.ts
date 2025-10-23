class Config {
  private static instance: Config;

  public readonly JWT_SECRET: string;
  public readonly PORT: number;
  public readonly NODE_ENV: string;
  public readonly DATABASE_URL: string;
  
  private constructor() {
    if (
      !process.env.JWT_SECRET ||
      !process.env.PORT ||
      !process.env.NODE_ENV ||
      !process.env.DATABASE_URL
    ) {
      throw new Error("Missing environment variables");
    }
    this.JWT_SECRET = process.env.JWT_SECRET!;
    this.PORT = Number(process.env.PORT)!;
    this.NODE_ENV = process.env.NODE_ENV!;
    this.DATABASE_URL = process.env.DATABASE_URL!;
  }

  public static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  }
}

export const config = Config.getInstance();
