import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product, typedFormGroup } from '../../shared/models';
import { ControlWrapperComponent } from '../../shared/components/control-wrapper/control-wrapper.component';
import { idValidator, dateMin } from '../../shared/util';
import { EditService } from './edit.service';
import { ToastService } from '../../shared/services/toast.service';
import { Router } from '@angular/router';
import { addYears, format, parse, set } from 'date-fns';

@Component({
	selector: 'app-edit',
	standalone: true,
	imports: [
		FormsModule,
		ReactiveFormsModule,
		ControlWrapperComponent
	],
	templateUrl: './edit.component.html',
	styleUrl: './edit.component.scss'
})
export class EditComponent implements OnInit {

	today = set(new Date(), {hours: 0, minutes: 0, seconds: 0, milliseconds: 0});
	loading = false;

	releaseDate: string = format(this.today, 'yyyy-MM-dd');
	revisionDate: string = format(addYears(this.today, 1), 'yyyy-MM-dd');

	form = new FormGroup<typedFormGroup<Product>>({
		id: new FormControl(
			{ value: '', disabled: true },
			{ nonNullable: true, validators: [idValidator()] }
		),
		name: new FormControl('', {
			nonNullable: true,
			validators: [Validators.required, Validators.minLength(5), Validators.maxLength(100)]
		}),
		description: new FormControl('', {
			nonNullable: true,
			validators: [Validators.required, Validators.minLength(10), Validators.maxLength(200)]
		}),
		logo: new FormControl('', {
			nonNullable: true,
			validators: [Validators.required]
		}),
		date_release: new FormControl(
			this.today,
			{
				nonNullable: true,
				validators: [Validators.required, dateMin(this.today)]
			}
		),
		date_revision: new FormControl(
			{ value: addYears(this.today, 1), disabled: true },
			{ nonNullable: true, validators: [Validators.required] }
		)
	});

	constructor(
		private router: Router,
		private service: EditService,
		private toasts: ToastService
	) { }

	ngOnInit(): void {

		if (history.state?.product) {
			const { product } = history.state;
			this.form.patchValue({ ...product });
		} else {
			this.router.navigate(['/']);
		}
	}

	dateChange(date: string) {

		const dateObj = parse(date, 'yyyy-MM-dd', new Date());
		const aYearLater = addYears(dateObj, 1);
		this.revisionDate = format(aYearLater, 'yyyy-MM-dd');

		this.form.patchValue({
			date_release: dateObj,
			date_revision: aYearLater
		});
	}

	submit() {

		const value = this.form.getRawValue();

		if (this.form.invalid) {
			this.form.patchValue(value);
			return;
		}

		this.loading = true;
		const toast = this.toasts.loading();
	
		this.service.edit(value as Product)
		.subscribe({
			next: () => {
				this.toasts.dismiss(toast);
				this.toasts.success();
				this.router.navigate(['/']);
			},
			error: () => {
				this.toasts.dismiss(toast);
				this.toasts.error();
			}
		});
	}

	reset() {
		this.releaseDate = format(this.today, 'yyyy-MM-dd');
		this.revisionDate = format(addYears(this.today, 1), 'yyyy-MM-dd');
		this.form.reset();
	}
}
