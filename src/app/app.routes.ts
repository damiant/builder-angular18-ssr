import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { BuilderPage } from "./components/builder-page.component";
import { BuilderSection } from './components/builder-section.component';

import { FigmaImportsPage } from "./components/figma-imports.component";

export const routes: Routes = [
  { path: 'builder-demo', component: BuilderPage },
  { path: 'section', component: BuilderSection },
  //{ path: ':zip', component: AppComponent },
  { path: "figma-imports", component: FigmaImportsPage },
  { path: '', redirectTo: '/builder-demo', pathMatch: 'full' },
  {
    path: "**",
    component: BuilderPage
  }
];