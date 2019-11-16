import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { HeaderComponent } from './components/header/header.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { UrlInterceptor } from './services/url.interceptor';

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  declarations: [
    HeaderComponent
  ],
  exports: [
    HeaderComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UrlInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {}
