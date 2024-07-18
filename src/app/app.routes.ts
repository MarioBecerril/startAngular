import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ClientsListComponent } from './pages/clients-list/clients-list.component';
import { NewClientComponent } from './pages/new-client/new-client.component';
import { LoginComponent } from './pages/login/login.component';
import { FeaturesComponent } from './pages/features/features.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'clients', component: ClientsListComponent, canActivate: [AuthGuard] },
  { path: 'new-client', component: NewClientComponent, canActivate: [AuthGuard] },
  { path: 'nuevo-cliente/:id', component: NewClientComponent, canActivate: [AuthGuard] },
  { path: 'features', component: FeaturesComponent, canActivate: [AuthGuard] },
];
