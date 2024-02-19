import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ChecklistService } from '../../services/http/checklist.service';

export const checklistResolver: ResolveFn<any> = (route, state) => {
  const checklistService = inject(ChecklistService);
  return checklistService.getChecklistById(route.paramMap.get('source')!, route.paramMap.get('id')!);
};

 