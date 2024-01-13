
export interface MorningChecklistInterface {
    Date: Date;
    GlassOfWater: boolean;
    Meds: boolean;
    Vitamins: boolean;
    Breakfast: boolean;
}

export class MorningChecklist {
    Date = new Date();
    GlassOfWater = false;
    Meds = false;
    Vitamins = false;
    Breakfast = false;

    constructor() {
    }
}