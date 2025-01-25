import { Routes } from '@angular/router';

import { BuilderPage } from "./components/builder-page.component";
import { BuilderSection } from './components/builder-section.component';

import { FigmaImportsPage } from "./components/figma-imports.component";
import { BuilderSymbol } from './components/builder-symbol.component';
import { GetStartedComponent } from './components/get-started.component';

export const routes: Routes = [
  { path: 'builder-demo', component: BuilderPage },
  { path: 'section', component: BuilderSection },
  { path: 'symbol', component: BuilderSymbol },
  { path: 'get-started', component: GetStartedComponent },
  //{ path: ':zip', component: AppComponent },
  { path: "figma-imports", component: FigmaImportsPage },
  { path: '', redirectTo: '/builder-demo', pathMatch: 'full' },
  {
    path: "**",
    component: BuilderPage
  }
];