export interface Articles {
  articles: Article[];
  articlesCount: number;
}
export interface Article {
  title: string;
  slug: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  tagList: string[];
  description: string;
  author: Author;
  favorited: boolean;
  favoritesCount: number;
}
export interface Author {
  username: string;
  bio?: string;
  image: string;
  following: boolean;
}
