
export function GetDateType(dt: string | undefined) {
    if (!dt) return;
    return dt.includes('T') ? new Date(dt) : new Date(dt + 'T00:00:00');
}