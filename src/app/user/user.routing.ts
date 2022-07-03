import { Routes, RouterModule } from '@angular/router';
import { UserComponent, UserListComponent } from './components';
const UserRoutes: Routes = [
  {
    path: '', component: UserComponent,
    data: { title: 'Users' },
    children: [
      { path: '', component: UserListComponent }
    ]
  }

];
export const UserRouting = RouterModule.forChild(UserRoutes);