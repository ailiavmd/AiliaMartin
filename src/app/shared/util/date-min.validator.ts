import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isBefore } from 'date-fns';

export const dateMin = (min: Date): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
        if (isBefore(control.value, min)) return { custom: 'La fecha debe ser mayor o igual a la fecha de hoy' };
        return null;
    };
};
