import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./guards/index";
const appRoutes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: "**",
    redirectTo: "admin",
  }
];

export const Routing = RouterModule.forRoot(appRoutes);
