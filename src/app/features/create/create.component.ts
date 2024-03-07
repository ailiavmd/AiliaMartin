import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product, typedFormGroup } from '../../shared/models';
import { ControlWrapperComponent } from '../../shared/components/control-wrapper/control-wrapper.component';
import { dateToStr, idValidator, oneYearLater, strToDate } from '../../shared/util';
import { CreateService } from './create.service';
import { ToastService } from '../../shared/services/toast.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-create',
	standalone: true,
	imports: [
		FormsModule,
		ReactiveFormsModule,
		ControlWrapperComponent
	],
	templateUrl: './create.component.html',
	styleUrl: './create.component.scss'
})
export class CreateComponent implements OnInit {

	now = new Date();
	loading = false;

	releaseDate = dateToStr(this.now);
	revisionDate = dateToStr(oneYearLater(this.now));

	form = new FormGroup<typedFormGroup<Product>>({
		id: new FormControl('', {
			nonNullable: true,
			validators: [idValidator()]
		}),
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
			this.now,
			{
				nonNullable: true,
				validators: [Validators.required]
			}
		),
		date_revision: new FormControl(
			{
				value: oneYearLater(this.now),
				disabled: true
			},
			{
				nonNullable: true,
				validators: [Validators.required]
			}
		)
	});

	constructor(
		private router: Router,
		private service: CreateService,
		private toasts: ToastService
	) { }

	ngOnInit(): void {
		// const now = new Date();
		// this.releaseDate = dateToStr(now);

		// const aYearLater = oneYearLater(now);
		// this.revisionDate = dateToStr(aYearLater);

		// this.form.patchValue({
		// 	date_release: now,
		// 	date_revision: aYearLater
		// });
	}

	dateChange(date: string) {

		const dateObj = strToDate(date);
		const aYearLater = oneYearLater(dateObj);
		this.revisionDate = dateToStr(aYearLater);

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
	
		this.service.create(value as Product)
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
}
