export class QuestionFormItem<T> {
    value: T | undefined;
    key: string;
    label: string;
    questionOrder: number;
    kindBase: string; // controlType, inputType for textbox
    kindDetail: string;
    minValue?: number;
    maxValue?: number;
    required?: boolean;  // Only Date will be required
    options?: { key: string, value: string }[]; // dropdowns only

    constructor(options: {
        value?: T;
        key?: string;
        label?: string;
        questionOrder?: number;
        kindBase?: string;
        kindDetail?: string;
        minValue?: number;
        maxValue?: number;
        required?: boolean;
        options?: { key: string, value: string }[];
      } = {}) {
        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.questionOrder = options.questionOrder === undefined ? 1 : options.questionOrder;
        this.kindBase = options.kindBase || ''; 
        this.kindDetail = options.kindDetail || '';
        this.minValue = options.minValue || undefined;
        this.maxValue = options.maxValue || undefined;
        this.required = !!options.required;
        this.options = options.options || [];
      }
}






