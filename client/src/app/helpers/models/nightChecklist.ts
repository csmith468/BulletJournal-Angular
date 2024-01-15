export interface NightChecklistInterface {
    Date: Date;
    GlassOfWater: boolean;
    Meds: boolean;
    Vitamins: boolean;
    WashFace: boolean;
    Floss: boolean;
    CheckEmails: boolean;
    CheckTexts: boolean;
    Mouthguard: boolean;
    ModifiedDatetime: Date;
}

export class NightChecklist {
    Date = new Date();
    GlassOfWater = false;
    Meds = false;
    Vitamins = false;
    WashFace = false;
    Floss = false;
    CheckEmails = false;
    CheckTexts = false;
    Mouthguard = false;
    ModifiedDatetime = new Date();

    constructor() {
    }
}