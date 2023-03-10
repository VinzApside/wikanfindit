import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'register',
        loadChildren: () =>
          import('../register/register.module').then(
            (m) => m.RegisterPageModule
          ),
      },
      {
        path: 'play',
        loadChildren: () =>
          import('../play/play.module').then((m) => m.PlayPageModule),
      },
      {
        path: 'stats',
        loadChildren: () =>
          import('../stats/stats.module').then((m) => m.StatsPageModule),
      },
      {
        path: '',
        redirectTo: '/register',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/register',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
