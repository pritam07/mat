import { Routes, RouterModule } from "@angular/router";
import {DashboardComponent} from './dashboard.component';

const Dashboard_Router: Routes = [
    {
        path: '',
        component: DashboardComponent
    }
];
export const DashboardRouter = RouterModule.forChild(Dashboard_Router);