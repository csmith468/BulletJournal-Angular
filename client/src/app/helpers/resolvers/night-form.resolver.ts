import { ResolveFn } from '@angular/router';
import { NightChecklist } from '../models/data-models/nightChecklist';
import { NightService } from '../services/form-sets/night.service';
import { inject } from '@angular/core';

export const nightFormResolver: ResolveFn<NightChecklist> = (route, state) => {
  const nightService = inject(NightService);
  return nightService.getNightChecklistById(route.paramMap.get('id')!);
};
