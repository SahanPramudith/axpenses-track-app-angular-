import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        loadComponent: () =>
            import('./feture/expence/dashboard/dashboard.component').then(
                m => m.DashboardComponent),
    },
    {
        path: 'expensesForm',
        loadComponent: () =>
            import('./feture/expence/expencce-from/expencce-from.component').then(
                m => m.ExpencceFromComponent),
    },
    {
        path: 'expensesList',
        loadComponent: () =>
            import('./feture/expence/expencce-list/expencce-list.component').then(
                m => m.ExpencceListComponent),
    },
    {
        path: 'editExpenses/:id/edit',
        loadComponent: () =>
            import('./feture/expence/expencce-from/expencce-from.component').then(
                m => m.ExpencceFromComponent),
    }


];
