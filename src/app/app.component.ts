import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/ui/header/header.component';
import { ToastsComponent } from './core/ui/toasts/toasts.component';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, HeaderComponent, ToastsComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {
	title = 'AiliaMartin';
}
