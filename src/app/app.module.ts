import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component'
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { MovieTypePipe } from './pipes/movie-type.pipe'


@NgModule({
  declarations: [
    AppComponent,
    MovieCardComponent,
    MovieTypePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
