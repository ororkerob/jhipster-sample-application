import { ICategory } from 'app/shared/model/category.model';

export interface IProduct {
  id?: number;
  name?: string;
  category?: ICategory;
}

export class Product implements IProduct {
  constructor(public id?: number, public name?: string, public category?: ICategory) {}
}
