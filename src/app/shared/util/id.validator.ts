import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const idValidator = (): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if (!!value && value.length > 2 && value.length < 11) return null;
        else return { custom: { message: 'ID no válido' } };
    }
};
