import { Routes, RouterModule } from '@angular/router';
import { FeedbackComponent, FeedbackListComponent } from './components';
const FeedbackRoutes: Routes = [
  {
    path: '', component: FeedbackComponent,
    data: { title: 'Feedback' },
    children: [
      { path: '', component: FeedbackListComponent }
    ]
  }

];
export const FeedbackRouting = RouterModule.forChild(FeedbackRoutes);