import { config } from "dotenv";
import { get } from 'env-var';

config({path: '.env'});

export interface EnvVars {
  PORT : number;
  PULBIC_DIRECTORY : string;
}

export const envVars: EnvVars = {
  PORT: get('PORT').required().asPortNumber(),
  PULBIC_DIRECTORY: get('PULBIC_DIRECTORY').required().asString(),
};