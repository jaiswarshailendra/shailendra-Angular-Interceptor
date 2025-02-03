import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard'; 
import { DemoComponent } from './demo/demo.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'login',
        pathMatch:'full'
    },
    {
        path:'login',
        component: LoginComponent
    },
    {
        path:'dashboard',
        component: DashboardComponent,canActivate:[AuthGuard]
    },
    {
        path:'demo',
        component:DemoComponent
    }
];
