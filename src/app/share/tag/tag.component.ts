import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css'],
})
export class TagComponent {
  @Input() tags: [];
  @Output() showTagByHuman = new EventEmitter();
  // constructor() {}

  // ngOnInit(): void {}
  showHumanTag(tag: string): void{
    this.showTagByHuman.emit(tag);
  }
}
