export interface NewArticle {
    article: Article;
}

export interface Article {
    title: string;
    description: string;
    body: string;
    tagList: string[];
}
