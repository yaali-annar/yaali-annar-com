export interface ArticleData {
    title: string;
    description: string;
    tags?: string[];
}

export interface Article {
    slug: string;
    content: string;
    data: ArticleData
}