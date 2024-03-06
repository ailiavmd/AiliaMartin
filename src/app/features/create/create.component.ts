import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product, typedFormGroup } from '../../shared/models';
import { ControlWrapperComponent } from '../../shared/components/control-wrapper/control-wrapper.component';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ControlWrapperComponent
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent implements OnInit {

  form = new FormGroup<typedFormGroup<Product>>({
    id: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.min(3), Validators.max(10)]
    }),
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.min(5), Validators.max(100)]
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.min(10), Validators.max(200)]
    }),
    logo: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    date_release: new FormControl(new Date(), {
      nonNullable: true,
      validators: [Validators.required]
    }),
    date_revision: new FormControl(
      {
        value: new Date(),
        disabled: true
      }, {
        nonNullable: true,
        validators: [Validators.required]
      }
    )
  });

  constructor() { }

  ngOnInit(): void {

  }

  submit(event: Event) {

  }
}
