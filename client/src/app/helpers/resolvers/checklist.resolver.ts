import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ChecklistService } from '../../services/checklist.service';

export const checklistResolver: ResolveFn<any> = (route, state) => {
  const checklistService = inject(ChecklistService);
  var ch = checklistService.getChecklistById(route.paramMap.get('source')!, route.paramMap.get('id')!);
  console.log(route.paramMap.get('source'))
  console.log(route.paramMap.get('id'))
  return ch;
};

 