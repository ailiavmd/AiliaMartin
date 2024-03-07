export const strToDate = (str: string): Date => {
    const split = str.split('-');
    const years = Number(split[0]);
    const months = Number(split[1]);
    const days = Number(split[2]);
    return new Date(years, (months-1), days);
};
