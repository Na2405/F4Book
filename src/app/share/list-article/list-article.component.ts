import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ArticleService } from 'src/app/article/article.service';
import { FeedService } from 'src/app/feed/feed.service';

@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.css'],
})
export class ListArticleComponent implements OnInit {
  @Input() listArticle;
  @Input() tagEvent;
  @Input() listTab: string[];
  @Output() handleChangeTab = new EventEmitter();
  @Output() handleAddFavorite = new EventEmitter();
  @Output() handleDeleteFavorite = new EventEmitter();
  @Input() currentTab: string;
  constructor(private feedService: FeedService) {
    // this.currentTab = this.listTab[0]
    this.feedService.isTagChange.subscribe((tag) => {
      this.changeTab(tag);
    });
  }

  ngOnInit(): void {
    this.currentTab = this.listTab[0];
  }

  changeTab(tabName): void {
    this.currentTab = tabName;
    this.handleChangeTab.emit(tabName);
  }

  addFavorite(slug): void {
    this.handleAddFavorite.emit(slug);
  }
  deleteFavorite(slug): void {
    this.handleDeleteFavorite.emit(slug);
  }
}
