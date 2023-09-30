import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginPage } from './components/login/login.page';
import { RegisterPage } from './components/register/register.page';


const routes: Routes = [
  {path: '',redirectTo: 'login',pathMatch: 'full'},
  {path:'login',component: LoginPage},
  {path:'register',component: RegisterPage}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
