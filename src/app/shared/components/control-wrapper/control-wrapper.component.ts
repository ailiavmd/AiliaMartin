import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ValidationMessagePipe } from '../../pipes/validation-message.pipe';
import { Subject, takeUntil } from 'rxjs';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-control-wrapper',
  standalone: true,
  imports: [
    ValidationMessagePipe
  ],
  templateUrl: './control-wrapper.component.html',
  styleUrl: './control-wrapper.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ControlWrapperComponent {

  errors: {[key: string]: any}[] = [];

  unsubscriber$ = new Subject<void>();

  @Input() set control(control: AbstractControl | undefined) {
    
    if (!control) { return; }

    control.statusChanges
      .pipe(takeUntil(this.unsubscriber$))
      .subscribe(() => {
        if (control.errors) {
          this.errors = Object.keys(control.errors).map(key => ({[key]: control.errors![key]}));
        } else this.errors = [];
      });
  }

  ngOnDestroy(): void {
    this.unsubscriber$.next();
    this.unsubscriber$.complete();
  }
}
