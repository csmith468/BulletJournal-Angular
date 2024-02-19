export class QuestionBase<T> {
    value: T | undefined;
    key: string;
    label: string;
    required: boolean;
    questionOrder: number;
    controlType: string;
    type: string;
    inputType: string; // textboxes only
    options: { key: string, value: string }[]; //dropdowns only
    minValue?: number;
    maxValue?: number;

    constructor(options: {
        value?: T;
        key?: string;
        label?: string;
        required?: boolean;
        questionOrder?: number;
        controlType?: string;
        type?: string;
        inputType?: string; // textboxes only
        options?: {key: string, value: string}[];
        minValue?: number;
        maxValue?: number;
      } = {}) {
        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.required = !!options.required;
        this.questionOrder = options.questionOrder === undefined ? 1 : options.questionOrder;
        this.controlType = options.controlType || '';
        this.type = options.type || '';
        this.inputType = options.inputType || ''; // textboxes only
        this.options = options.options || [];
        this.minValue = options.minValue;
        this.maxValue = options.maxValue;
      }
}






