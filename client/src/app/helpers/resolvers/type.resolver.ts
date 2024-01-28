import { ResolveFn } from '@angular/router';

export const typeResolver: ResolveFn<any> = (route, state) => {
  return {'type': route.paramMap.get('type')!, 'id': route.paramMap.get('id')};
};

