import { Server } from '../src/presentation/server';
import { MainRoutes } from '../src/presentation/routes';
import { envVars } from '../src/plugins/env.plugin';

const ServerTest = new Server({
  port: envVars.PORT,
  publicDirFiles: envVars.PULBIC_DIRECTORY,
  routes: MainRoutes.get(),
});

export default ServerTest;