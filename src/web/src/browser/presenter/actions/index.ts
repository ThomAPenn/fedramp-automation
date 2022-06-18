export * as assertionDocumentation from './assertion-documentation';
import * as assertionDocumentation from './assertion-documentation';
export * as documentViewer from './document-viewer';
export * as metrics from './metrics';
import * as metrics from './metrics';
export * as schematron from './schematron';
import * as schematron from './schematron';
export * as validator from './validator';

import type { ActionContext } from '..';
import * as router from '../state/router';

export const initializeApplication = (config: ActionContext) => {
  setCurrentRoute(config.effects.location.getCurrent())(config);
  config.effects.location.listen((url: string) => {
    setCurrentRoute(url)(config);
  });
  schematron.initialize(config);
  assertionDocumentation.initialize(config);
  metrics.initialize(config);
};

export const setCurrentRoute =
  (url: string) =>
  ({ dispatch, effects }: ActionContext) => {
    const route = router.getRoute(url);
    if (route.type !== 'NotFound') {
      dispatch({
        type: 'ROUTE_CHANGED',
        data: { route },
      });
      effects.location.replace(router.getUrl(route));
    }
  };
