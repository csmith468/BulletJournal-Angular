
export interface MorningChecklistInterface {
    date: Date;
    glassOfWater: boolean;
    meds: boolean;
    vitamins: boolean;
    breakfast: boolean;
}

export class MorningChecklist {
    date = new Date();
    glassOfWater = false;
    meds = false;
    vitamins = false;
    breakfast = false;

    constructor() {
    }
}
