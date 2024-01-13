export function getDateOnly(dt: string | undefined) {
    if (!dt) return;
    let theDay = new Date(dt);
    return new Date(theDay.setMinutes(theDay.getMinutes() - theDay.getTimezoneOffset()))
        .toISOString().slice(0, 10);
}