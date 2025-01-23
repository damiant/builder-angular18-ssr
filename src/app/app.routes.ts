import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { BuilderPage } from "./components/builder-page.component";

export const routes: Routes = [
  { path: 'builder-demo', component: BuilderPage },
  { path: ':zip', component: AppComponent },
  { path: '', redirectTo: '/90210', pathMatch: 'full' },
  {
    path: "**",
    component: BuilderPage
  }
];