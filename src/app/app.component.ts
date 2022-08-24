import { Component } from '@angular/core';
import {KinopoiskService} from "./services/kinopoisk.service";
import {IKinopoisk} from "./services/kinopoisk";
import {delay} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  movie: IKinopoisk[] = []
  obj: Object = {}
  loader = false

  constructor(private kinopoiskServise: KinopoiskService) {}

  getMovie() {
    this.loader = true
    this.kinopoiskServise.getMovieService()
      .pipe(delay(3000))
      .subscribe(response => {
        this.obj = response
        this.movie = Object.values(this.obj)[0]
        this.loader = false
        console.log(Object.values(this.obj)[0].length)

      })


  }

}
