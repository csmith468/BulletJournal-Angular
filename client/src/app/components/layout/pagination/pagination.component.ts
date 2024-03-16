import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@Component({
  standalone: true,
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
  imports: [CommonModule, PaginationModule, FormsModule, ReactiveFormsModule]
})
export class PaginationComponent implements OnInit {
  @Input() currentPage: number = 1;
  @Input() itemsPerPage: number = 0;
  @Input() totalItems: number = 0;
  @Input() totalPages: number = 1;
  @Output() pageChanged: EventEmitter<number> = new EventEmitter();
  pageRange: number[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.setPageRange();
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.pageChanged.emit(page);

      this.setPageRange();
    }
  }

  setPageRange() {
    var pages = [];
    const visiblePages = 10;

    const midpoint = Math.ceil(visiblePages / 2);
    let start = this.currentPage - midpoint;
    let end = start + visiblePages - 1;

    if (start < 1) {
      start = 1;
      end = Math.min(this.totalPages, visiblePages);
    } else if (end > this.totalPages) {
      end = this.totalPages;
      start = Math.max(1, end - visiblePages + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    this.pageRange = pages;
  }

}
