
export interface MorningChecklistInterface {
    date: Date;
    glassOfWater: boolean;
    meds: boolean;
    vitamins: boolean;
    breakfast: boolean;
    modifiedDatetime: Date;
}

export class MorningChecklist {
    date = new Date();
    glassOfWater = false;
    meds = false;
    vitamins = false;
    breakfast = false;
    modifiedDatetime = new Date();

    constructor() {
    }
}
