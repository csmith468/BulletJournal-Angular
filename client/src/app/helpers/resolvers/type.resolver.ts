import { ResolveFn } from '@angular/router';

export const typeResolver: ResolveFn<any> = (route, state) => {
  return {'source': route.paramMap.get('source')!, 'id': route.paramMap.get('id')};
};

