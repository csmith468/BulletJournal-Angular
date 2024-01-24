import { ResolveFn } from '@angular/router';
import { MorningEntry } from '../models/data-models/morningEntry';
import { inject } from '@angular/core';
import { MorningService } from '../services/form-sets/morning.service';

export const morningFormResolver: ResolveFn<MorningEntry> = (route, state) => {
  const morningService = inject(MorningService);
  return morningService.getMorningEntryById(route.paramMap.get('id')!);
};
