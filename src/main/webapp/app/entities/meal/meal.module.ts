import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared/shared.module';
import { MealComponent } from './meal.component';
import { MealDetailComponent } from './meal-detail.component';
import { MealUpdateComponent } from './meal-update.component';
import { MealDeleteDialogComponent } from './meal-delete-dialog.component';
import { mealRoute } from './meal.route';

@NgModule({
  imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(mealRoute)],
  declarations: [MealComponent, MealDetailComponent, MealUpdateComponent, MealDeleteDialogComponent],
  entryComponents: [MealDeleteDialogComponent]
})
export class JhipsterSampleApplicationMealModule {}
