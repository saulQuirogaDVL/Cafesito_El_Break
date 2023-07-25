import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgxPaginationModule} from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OrdersFormComponent } from './components/orders-form/orders-form.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { PayTypesFormComponent } from './components/pay-types-form/pay-types-form.component';
import { ProductsPickedFormComponent } from './components/products-picked-form/products-picked-form.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { MenuProductsComponent } from './components/menu-products/menu-products.component';
import { FilterProductsModalComponent } from './components/filter-products-modal/filter-products-modal.component';
import { ProductsFormComponent } from './components/products-form/products-form.component';
import { MenuDetailsComponent } from './components/menu-details/menu-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    OrdersFormComponent,
    NavigationComponent,
    PayTypesFormComponent,
    ProductsPickedFormComponent,
    ListProductsComponent,
    ProductItemComponent,
    MenuProductsComponent,
    FilterProductsModalComponent,
    ProductsFormComponent,
    MenuDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
