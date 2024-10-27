import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrincipalPage } from './principal.page';

const routes: Routes = [
  {
    path: '',
    component: PrincipalPage
  },
  {
    path: 'camera',
    loadChildren: () => import('../camera/camera.module').then( m => m.CameraPageModule)
  },
  {
    path: 'classes',
    loadChildren: () => import('../classes/classes.module').then( m => m.ClassesPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('../settings/settings.module').then( m => m.SettingsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrincipalPageRoutingModule {}
