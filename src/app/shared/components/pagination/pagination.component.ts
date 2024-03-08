import { DecimalPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output, computed, input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {

  totalPages = computed(() => {
    if (this.total() === 0) return 1;
    return Math.ceil(this.total() / this.pageLength());
  });

  pageLength = input.required<number>();

  total = input.required<number>();

  @Input({required: true}) currentPage!: number;

  @Output() pageChanged = new EventEmitter<number>();

  handlePrev() {
    this.pageChanged.emit(this.currentPage - 1);
  }

  handleNext() {
    this.pageChanged.emit(this.currentPage + 1);
  }
}
