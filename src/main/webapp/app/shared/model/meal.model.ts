import { Moment } from 'moment';
import { IRecipe } from 'app/shared/model/recipe.model';

export interface IMeal {
  id?: number;
  when?: Moment;
  breakfast?: IRecipe;
  lunch?: IRecipe;
  dinner?: IRecipe;
}

export class Meal implements IMeal {
  constructor(public id?: number, public when?: Moment, public breakfast?: IRecipe, public lunch?: IRecipe, public dinner?: IRecipe) {}
}
