import { ICategory } from 'app/shared/model/category.model';

export interface IRecipe {
  id?: number;
  name?: string;
  categories?: ICategory[];
}

export class Recipe implements IRecipe {
  constructor(public id?: number, public name?: string, public categories?: ICategory[]) {}
}
