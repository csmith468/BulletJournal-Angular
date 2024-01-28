import { ResolveFn } from '@angular/router';

export const typeResolver: ResolveFn<any> = (route, state) => {
  return route.paramMap.get('type')!;
};

