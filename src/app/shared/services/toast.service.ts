import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Toast } from '../models';

@Injectable({
	providedIn: 'root'
})
export class ToastService {

	private _toasts$ = new BehaviorSubject<Toast[]>([]);
	toasts$: Observable<Toast[]> = this._toasts$.asObservable();

	success(message = 'Operación exitosa') {
		this.add('success', message);
	}
	error(message = 'Algo ha ido mal') {
		this.add('error', message);
	}
	loading(message = 'Cargando...'): Toast {
		return this.add('loading', message);
	}

	add(type: 'success' | 'error' | 'loading', message: string): Toast {

		const current = this._toasts$.getValue();
		const toast =  { id: new Date().getTime(), type, message };
		this._toasts$.next([...current, toast]);

		if (type !== 'loading') {
			setTimeout(() => { this.dismiss(toast) }, 5000);
		}

		return toast;
	}

	dismiss(toast: Toast): void {
		const filtered = this._toasts$.getValue().filter((t: Toast) => t !== toast);
		this._toasts$.next(filtered);
	}
}
