import dotenv from 'dotenv';

dotenv.config();

export interface TestConfig {
    Sauce_Demo_Username: string;
    Sauce_Demo_Password: string;
}

export const testConfig: TestConfig = {
    Sauce_Demo_Username: process.env.Sauce_Demo_Username || '',
    Sauce_Demo_Password: process.env.Sauce_Demo_Password || '',
};
