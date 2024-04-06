import { argumentsValues } from "./config/plugins";
import { ServerApp } from "./presentation/server-app";


(async (): Promise<void> => {
  await main();
})();

/**
 * Metodo principal de ejecucion de la aplicacion
 */
async function main(): Promise<void> {
  const { b:base, l:limit , s:showTable, d:destination, n:name} = argumentsValues;
  ServerApp.run({base, limit, showTable, name, destination});
}