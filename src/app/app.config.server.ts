import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering() // Vérifiez que cette ligne est présente !
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);