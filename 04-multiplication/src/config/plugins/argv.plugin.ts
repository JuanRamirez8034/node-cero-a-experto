import yargs from "yargs";
import { hideBin } from "yargs/helpers";

/**
 * Variable con acceso a los arguments values utilizando yargs como dependencia
 */
export const yargsArgv = yargs(process.argv).parseSync();