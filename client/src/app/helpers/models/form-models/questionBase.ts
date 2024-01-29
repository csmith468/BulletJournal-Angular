export class QuestionBase<T> {
    value: T | undefined;
    key: string;
    label: string;
    required: boolean;
    order: number;
    controlType: string;
    type: string;
    inputType: string; // textboxes only
    options: { key: string, value: string }[]; //dropdowns only

    constructor(options: {
        value?: T;
        key?: string;
        label?: string;
        required?: boolean;
        order?: number;
        controlType?: string;
        type?: string;
        inputType?: string; // textboxes only
        options?: {key: string, value: string}[];
      } = {}) {
        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.required = !!options.required;
        this.order = options.order === undefined ? 1 : options.order;
        this.controlType = options.controlType || '';
        this.type = options.type || '';
        this.inputType = options.inputType || ''; // textboxes only
        this.options = options.options || [];
      }
}






