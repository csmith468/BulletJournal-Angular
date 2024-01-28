import { ResolveFn } from '@angular/router';
import { MorningChecklist } from '../models/data-models/morningChecklist';
import { inject } from '@angular/core';
import { MorningService } from '../services/form-sets/morning.service';

export const morningFormResolver: ResolveFn<MorningChecklist> = (route, state) => {
  const morningService = inject(MorningService);
  return morningService.getMorningChecklistById(route.paramMap.get('id')!);
};
