import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {
  @Input() page: number;
  @Input() pageSize: number;
  @Input() collectionSize: number;
  @Output() pageChangeByHandle = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}
  pageChange(page: number): void{
    this.pageChangeByHandle.emit(page);
  }
}
