import { Component } from '@angular/core';
import { ToastService } from '../../../shared/services/toast.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-toasts',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './toasts.component.html',
  styleUrl: './toasts.component.scss'
})
export class ToastsComponent {

  constructor(
    public service: ToastService
  ) { }
}
