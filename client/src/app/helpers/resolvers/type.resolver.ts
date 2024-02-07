import { ResolveFn } from '@angular/router';

export const typeResolver: ResolveFn<any> = (route, state) => {
  var source = route.paramMap.get('source')!;
  var header = source.charAt(0).toUpperCase() + source.slice(1);

  if (source === 'physical') header = 'Physical Symptoms';
  if (source === 'spendingFinancial') header = 'Financial Spending';
  if (source === 'spendingHealthcare') header = 'Healthcare Spending';
  if (source === 'spendingPersonal') header = 'Personal Spending';
  if (source === 'spendingRegular') header = 'Regular (Recurring) Spending';
  
  return {'source': source, 'header': header, 'id': route.paramMap.get('id')};
};

