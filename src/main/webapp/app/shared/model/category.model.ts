import { IRecipe } from 'app/shared/model/recipe.model';

export interface ICategory {
  id?: number;
  name?: string;
  recipes?: IRecipe[];
}

export class Category implements ICategory {
  constructor(public id?: number, public name?: string, public recipes?: IRecipe[]) {}
}
