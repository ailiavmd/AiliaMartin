import { FormControl } from '@angular/forms';

export type typedFormGroup<T> = {
    [K in keyof T]?: FormControl<T[K]>;
};
