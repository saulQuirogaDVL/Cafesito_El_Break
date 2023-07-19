import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component'
import { OrdersFormComponent } from './components/orders-form/orders-form.component'
import { AuthGuard } from './guards/auth.guard';
import { MenuProductsComponent } from './components/menu-products/menu-products.component';
import { ProductsFormComponent } from './components/products-form/products-form.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: 'login', component: LoginFormComponent},
  { path: 'orders', component: OrdersFormComponent, canActivate: [AuthGuard] },
  { path: 'orders', component: OrdersFormComponent, canActivate: [AuthGuard] },
  { path: 'products', component: MenuProductsComponent, canActivate: [AuthGuard] },
  { path: 'products/add', component: ProductsFormComponent, canActivate: [AuthGuard] },
  { path: 'products/edit/:id', component: ProductsFormComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
