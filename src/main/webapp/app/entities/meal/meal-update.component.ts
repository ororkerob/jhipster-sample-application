import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IMeal, Meal } from 'app/shared/model/meal.model';
import { MealService } from './meal.service';
import { IRecipe } from 'app/shared/model/recipe.model';
import { RecipeService } from 'app/entities/recipe/recipe.service';

@Component({
  selector: 'jhi-meal-update',
  templateUrl: './meal-update.component.html'
})
export class MealUpdateComponent implements OnInit {
  isSaving = false;
  breakfasts: IRecipe[] = [];
  lunches: IRecipe[] = [];
  dinners: IRecipe[] = [];

  editForm = this.fb.group({
    id: [],
    when: [],
    breakfast: [],
    lunch: [],
    dinner: []
  });

  constructor(
    protected mealService: MealService,
    protected recipeService: RecipeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ meal }) => {
      if (!meal.id) {
        const today = moment().startOf('day');
        meal.when = today;
      }

      this.updateForm(meal);

      this.recipeService
        .query({ filter: 'meal-is-null' })
        .pipe(
          map((res: HttpResponse<IRecipe[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IRecipe[]) => {
          if (!meal.breakfast || !meal.breakfast.id) {
            this.breakfasts = resBody;
          } else {
            this.recipeService
              .find(meal.breakfast.id)
              .pipe(
                map((subRes: HttpResponse<IRecipe>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IRecipe[]) => (this.breakfasts = concatRes));
          }
        });

      this.recipeService
        .query({ filter: 'meal-is-null' })
        .pipe(
          map((res: HttpResponse<IRecipe[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IRecipe[]) => {
          if (!meal.lunch || !meal.lunch.id) {
            this.lunches = resBody;
          } else {
            this.recipeService
              .find(meal.lunch.id)
              .pipe(
                map((subRes: HttpResponse<IRecipe>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IRecipe[]) => (this.lunches = concatRes));
          }
        });

      this.recipeService
        .query({ filter: 'meal-is-null' })
        .pipe(
          map((res: HttpResponse<IRecipe[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IRecipe[]) => {
          if (!meal.dinner || !meal.dinner.id) {
            this.dinners = resBody;
          } else {
            this.recipeService
              .find(meal.dinner.id)
              .pipe(
                map((subRes: HttpResponse<IRecipe>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IRecipe[]) => (this.dinners = concatRes));
          }
        });
    });
  }

  updateForm(meal: IMeal): void {
    this.editForm.patchValue({
      id: meal.id,
      when: meal.when ? meal.when.format(DATE_TIME_FORMAT) : null,
      breakfast: meal.breakfast,
      lunch: meal.lunch,
      dinner: meal.dinner
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const meal = this.createFromForm();
    if (meal.id !== undefined) {
      this.subscribeToSaveResponse(this.mealService.update(meal));
    } else {
      this.subscribeToSaveResponse(this.mealService.create(meal));
    }
  }

  private createFromForm(): IMeal {
    return {
      ...new Meal(),
      id: this.editForm.get(['id'])!.value,
      when: this.editForm.get(['when'])!.value ? moment(this.editForm.get(['when'])!.value, DATE_TIME_FORMAT) : undefined,
      breakfast: this.editForm.get(['breakfast'])!.value,
      lunch: this.editForm.get(['lunch'])!.value,
      dinner: this.editForm.get(['dinner'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMeal>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IRecipe): any {
    return item.id;
  }
}
