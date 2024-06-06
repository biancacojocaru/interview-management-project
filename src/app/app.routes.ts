import { Routes } from '@angular/router';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { VerifyEmailComponent } from './components/authentication/verify-email/verify-email.component';
import { ForgotPasswordComponent } from './components/authentication/forgot-password/forgot-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { VacanciesComponent } from './vacancies/vacancies.component';
import { CandidatesComponent } from './candidates/candidates.component';
import { OffersComponent } from './offers/offers.component';
import { SettingsComponent } from './settings/settings.component';

const appName = 'Interview Management Portal';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: '',
    component: AuthenticationComponent,
    title: `Authentication | ${appName}`,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        title: `Login | ${appName}`,
      },
      {
        path: 'register',
        component: RegisterComponent,
        title: `Register | ${appName}`,
      },
      {
        path: 'verify-email',
        component: VerifyEmailComponent,
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        title: `Forgot Password | ${appName}`,
      },
    ],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: `Home | ${appName}`,
  },
  {
    path: 'schedule',
    component: ScheduleComponent,
    title: `Schedule | ${appName}`,
  },
  {
    path: 'analytics',
    component: AnalyticsComponent,
    title: `Analytics | ${appName}`,
  },
  {
    path: 'vacancies',
    component: VacanciesComponent,
    title: `Vacancies | ${appName}`,
  },
  {
    path: 'candidates',
    component: CandidatesComponent,
    title: `Candidates | ${appName}`,
  },
  {
    path: 'offers',
    component: OffersComponent,
    title: `Offers | ${appName}`,
  },
  {
    path: 'settings',
    component: SettingsComponent,
    title: `Settings | ${appName}`,
  },
];
