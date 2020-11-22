import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { TagComponent } from './tag/tag.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ListArticleComponent } from './list-article/list-article.component';
import { RouterModule } from '@angular/router';
import { PreloadingComponent } from './preloading/preloading.component';
import { PreloadingRoundedSquareComponent } from './preloading-rounded-square/preloading-rounded-square.component';
import { PreloadingHashComponent } from './preloading-hash/preloading-hash.component';

@NgModule({
  declarations: [
    PaginationComponent,
    TagComponent,
    ListArticleComponent,
    PreloadingComponent,
    PreloadingRoundedSquareComponent,
    PreloadingHashComponent,
    ],
  imports: [CommonModule, NgbPaginationModule, RouterModule],
  exports: [TagComponent,
    PaginationComponent,
    ListArticleComponent,
    PreloadingComponent,
    PreloadingRoundedSquareComponent,
    PreloadingHashComponent],
})
export class ShareModule {}
