import {InjectionToken, isDevMode} from "@angular/core";

export const ENV_VARIABLES_TOKEN = new InjectionToken('ENV_VARIABLES_TOKEN',
  {
    factory: () => {
      if (isDevMode()) {
        return 'https://lobster-app-86syw.ondigitalocean.app';
      }
      return true
    }
  });
