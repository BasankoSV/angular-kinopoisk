import { Pipe, PipeTransform } from '@angular/core';
import {IKinopoisk} from "../services/kinopoisk";

@Pipe({
  name: 'movieType'
})
export class MovieTypePipe implements PipeTransform {

  transform(movieType: string): string {

    switch (movieType) {
      case 'movie': movieType = 'фильм';
        break;
      case 'tv-series': movieType = 'сериал';
        break;
      case 'cartoon': movieType = 'мультфильм';
        break
      case 'amine': movieType = 'аниме';
        break;
      case 'animated-series': movieType = 'анимационный сериал';
        break;
      case 'tv-show': movieType = 'тв-шоу';
        break;
      default: movieType = 'жанр не указан';
    }

    return movieType
  }

}
