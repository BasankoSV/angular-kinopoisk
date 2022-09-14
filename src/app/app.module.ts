import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { AppRoutingModule } from "./app-routing.module"
import { HttpClientModule } from "@angular/common/http"
import { FormsModule } from "@angular/forms"

import { AppComponent } from "./app.component"
import { MovieTypePipe } from "./pipes/movie-type.pipe"
import { MovieCardComponent } from "./components/movie-card/movie-card.component"
import { MovieCardsComponent } from "./components/movie-cards/movie-cards.component"
import { MoviePromoComponent } from "./components/movie-promo/movie-promo.component"
import { MovieSearchComponent } from "./components/movie-search/movie-search.component"
import { PaginationComponent } from "./components/pagination/pagination.component";
import { HandlingDataComponent } from './components/handling-data/handling-data.component';
import { FromNumberToArrayPipe } from './pipes/from-number-to-array.pipe'


@NgModule({
  declarations: [
    AppComponent,
    MovieTypePipe,
    MovieCardComponent,
    MovieCardsComponent,
    MoviePromoComponent,
    MovieSearchComponent,
    PaginationComponent,
    HandlingDataComponent,
    FromNumberToArrayPipe
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
