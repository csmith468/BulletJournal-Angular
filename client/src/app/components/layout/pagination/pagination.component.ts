import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PaginationModule } from 'ngx-bootstrap/pagination';
import { Pagination } from 'src/app/models/data-models/pagination';

@Component({
  standalone: true,
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
  imports: [CommonModule, PaginationModule, FormsModule, ReactiveFormsModule]
})
export class PaginationComponent {
  @Input() pagination: Pagination | null = null;
  @Output() pageChanged: EventEmitter<number> = new EventEmitter();
  pageRange: number[] = [];

  constructor() {
  }

  changePage(page: number) {
    if (this.pagination) {
      if (page >= 1 && page <= this.pagination.totalPages) {
        this.pagination.currentPage = page;
        this.pageChanged.emit(page);
      }
    }
  }
}
