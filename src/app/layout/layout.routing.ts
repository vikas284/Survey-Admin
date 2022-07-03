import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './components';
import { AuthGuard } from "../guards/index";
const authRoutes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
             {
                path: 'survey',
                loadChildren: () => import('../survey/survey.module').then(m => m.SurveyModule)
            },
            {
                path: 'feedback',
                loadChildren: () => import('../feedback/feedback.module').then(m => m.FeedbackModule)
            },
            {
                path: 'user',
                loadChildren: () => import('../user/user.module').then(m => m.UserModule)
            },
            {
                path: '**',
                redirectTo: 'user',
                pathMatch: 'full'
            }
        ]
    }
];

export const layoutRouting = RouterModule.forChild(authRoutes);