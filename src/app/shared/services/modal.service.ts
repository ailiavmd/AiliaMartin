import { ApplicationRef, ComponentRef, EnvironmentInjector, Injectable, Type, createComponent } from '@angular/core';

@Injectable({
  	providedIn: 'root'
})
export class ModalService {

	private result!: Promise<any>;
	private resolve!: any;
  
	private ref!: ComponentRef<any>;
	private host!: HTMLDivElement;
  
	constructor(
		private appRef: ApplicationRef,
		private injector: EnvironmentInjector
	) { }

	init(): void {
		this.result = new Promise((resolve, reject) => {
		  	this.resolve = resolve;
		});
	}

	open(component: Type<any>, props: { [key: string]: any }): Promise<any> {

		this.init();

		this.host = document.createElement('div');
		document.body.appendChild(this.host);
	
		this.ref = createComponent(component, {
			environmentInjector: this.injector,
			hostElement: this.host,
		});
	
		Object.keys(props).forEach((key) => this.ref.setInput(key, props[key]));
		this.appRef.attachView(this.ref.hostView);

		return this.result;
	}
  
	close(response: any): Promise<any> {
		this.appRef.detachView(this.ref.hostView);
		this.host.remove();
		this.ref.destroy();
		return this.resolve(response);
	}
}
