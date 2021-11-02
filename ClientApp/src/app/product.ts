import { Category } from './category'
import { Source } from './source';

export interface Product {
    id: string,
    name: string,
    category: Category,
    categoryId: string,
    source: Source,
    sourceId: string,
    modifiedOn: Date,
    modifiedOnString: string,
    comment: string
}