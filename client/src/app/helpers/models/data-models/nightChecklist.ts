export interface NightChecklistInterface {
    date: Date;
    glassOfWater: boolean;
    meds: boolean;
    vitamins: boolean;
    washFace: boolean;
    floss: boolean;
    checkEmails: boolean;
    checkTexts: boolean;
    mouthguard: boolean;
    fruits: boolean;
    vegetables: boolean;
    read: boolean;
    wentOutside: boolean;
}

export class NightChecklist {
    date = new Date();
    glassOfWater = false;
    meds = false;
    vitamins = false;
    washFace = false;
    floss = false;
    checkEmails = false;
    checkTexts = false;
    mouthguard = false;
    fruits = false;
    vegetables = false;
    read = false;
    wentOutside = false;

    constructor() {
    }
}