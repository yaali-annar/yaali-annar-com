export interface ArticleData {
    title: string;
    description: string;
    tags?: string[];
}

export interface Article {
    slug: string;
    data: ArticleData
}

export interface ArticleDetail extends Article {
    content: string;
}