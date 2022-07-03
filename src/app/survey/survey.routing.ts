import { Routes, RouterModule } from '@angular/router';
import { SurveyComponent, SurveyListComponent } from './components';
const SurveyRoutes: Routes = [
  {
    path: '', component: SurveyComponent,
    data: { title: 'Survey' },
    children: [
      { path: '', component: SurveyListComponent }
    ]
  }

];
export const SurveyRouting = RouterModule.forChild(SurveyRoutes);