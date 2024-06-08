import { env } from "./plugins";
import { MainRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

(async() => {
  await main();
})();


async function main () {
    await new Server({
      port: env.PORT, 
      publicDirFiles: env.PULBIC_DIRECTORY, 
      routes: MainRoutes.get()
    }).start();
}