import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { config } from './app/app.config.server';

const bootstrap = (options: any) => {
  return bootstrapApplication(App, {
    ...config,
    ...options // C'est ici que le 'BootstrapContext' est injecté par Angular
  });
};

export default bootstrap;