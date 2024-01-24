import { ResolveFn } from '@angular/router';
import { NightEntry } from '../models/data-models/nightEntry';
import { NightService } from '../services/form-sets/night.service';
import { inject } from '@angular/core';

export const nightFormResolver: ResolveFn<NightEntry> = (route, state) => {
  const nightService = inject(NightService);
  return nightService.getNightEntryById(route.paramMap.get('id')!);
};
