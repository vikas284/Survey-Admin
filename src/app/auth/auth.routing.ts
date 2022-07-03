import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AuthComponent, LoginComponent } from './components';

const authRoutes: Routes = [
    {
        path: '',
        component: AuthComponent,
        children: [
            { path: '', component: LoginComponent }
        ]
    }

];

export const authRouting = RouterModule.forChild(authRoutes);