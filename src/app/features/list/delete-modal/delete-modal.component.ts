import { Component, Input } from '@angular/core';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { Product } from '../../../shared/models';
import { ToastService } from '../../../shared/services/toast.service';
import { ListService } from '../list.service';
import { ModalService } from '../../../shared/services/modal.service';

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [ModalComponent],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.scss'
})
export class DeleteModalComponent {

  loading = false;

  @Input() product!: Product;

  constructor(
    private service: ListService,
    private modal: ModalService,
    private toasts: ToastService
  ) { }

  deleteProduct() {

    this.loading = true;
    const toast = this.toasts.loading('Eliminando registro...')

		this.service.deleteProduct(this.product.id)
		.subscribe({
			next: () => {
				this.close(true);
				this.toasts.dismiss(toast);
				this.toasts.success();
			},
			error: () => {
        this.loading = false;
				this.toasts.dismiss(toast);
				this.toasts.error();
			}
		});
  }

  close(response = false) {
    this.modal.close(response);
  }
}
