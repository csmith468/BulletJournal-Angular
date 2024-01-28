import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ChecklistService } from '../services/checklist.service';

export const checklistAddResolver: ResolveFn<any> = (route, state) => {
  return route.paramMap.get('type')!;
};

// export const morningFormResolver: ResolveFn<MorningChecklist> = (route, state) => {
//   const morningService = inject(MorningService);
//   return morningService.getMorningChecklistById(route.paramMap.get('id')!);
// };
