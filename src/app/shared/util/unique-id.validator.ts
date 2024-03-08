import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { CreateService } from '../../features/create/create.service';
import { Observable, catchError, map, of } from 'rxjs';

export const uniqueId = (service: CreateService): AsyncValidatorFn => {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {

        const value = control.value;
        if (!control.value || !control.value.trim().length) {
            return of(null);
        }

        return service.verify(value)
        .pipe(
            map(exists => {
                return exists ? { custom: 'El ID ya existe' } : null;
            }),
            catchError(() => of(null))
        );
    }
};
