import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'validationMessage',
	standalone: true
})
export class ValidationMessagePipe implements PipeTransform {

	transform(error: { [key: string]: any }): string {
		
		if (!error) { return ''; }

		const key = Object.keys(error)[0];

		switch (key) {
			case 'required':
				return 'Este campo es requerido!';
			case 'email':
				return 'Correo electrónico inválido';
			case 'maxlength':
				return `El campo no debe tener más de ${error[key]['requiredLength']} caracteres`;
			case 'minlength':
				return `El campo debe tener al menos ${error[key]['requiredLength']} caracteres`;
			case 'arraymin':
				return `El campo debe tener al menos ${error[key]['requiredLength']} elemento(s).`;
			case 'custom':
				return error[key];
			default:
				return 'Campo inválido';
		}
	}
}
