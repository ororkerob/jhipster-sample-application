import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'meal',
        loadChildren: () => import('./meal/meal.module').then(m => m.JhipsterSampleApplicationMealModule)
      },
      {
        path: 'recipe',
        loadChildren: () => import('./recipe/recipe.module').then(m => m.JhipsterSampleApplicationRecipeModule)
      },
      {
        path: 'category',
        loadChildren: () => import('./category/category.module').then(m => m.JhipsterSampleApplicationCategoryModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class JhipsterSampleApplicationEntityModule {}
