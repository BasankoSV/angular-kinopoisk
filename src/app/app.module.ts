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


@NgModule({
  declarations: [
    AppComponent,
    MovieTypePipe,
    MovieCardComponent,
    MovieCardsComponent,
    MoviePromoComponent,
    MovieSearchComponent
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
