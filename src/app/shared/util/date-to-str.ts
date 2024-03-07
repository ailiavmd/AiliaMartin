import { DatePipe } from '@angular/common';

export const dateToStr = (date: Date): string => {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date, 'yyyy-MM-dd') as string;
};
