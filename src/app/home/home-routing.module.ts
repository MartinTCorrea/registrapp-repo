import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'principal',
    loadChildren: () => import('../principal/principal.module').then( m => m.PrincipalPageModule)
  },
  {
    path: 'recovery',
    loadChildren: () => import('../recovery/recovery.module').then( m => m.RecoveryPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('../settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'camera',
    loadChildren: () => import('../camera/camera.module').then( m => m.CameraPageModule)
  },
  {
    path: 'classes',
    loadChildren: () => import('../classes/classes.module').then( m => m.ClassesPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
