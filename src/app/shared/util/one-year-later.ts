export const oneYearLater = (date: Date): Date => {
    return new Date(date.getFullYear() + 1, date.getMonth(), date.getDate());
};
