import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'movieType'
})
export class MovieTypePipe implements PipeTransform {

  transform(movieType: string): string {

    switch (movieType) {
      case 'movie' || '1': movieType = 'фильм';
        break;
      case 'tv-series' || '2': movieType = 'сериал';
        break;
      case 'cartoon' || '3': movieType = 'мультфильм';
        break
      case 'anime' || '4': movieType = 'аниме';
        break;
      case 'animated-series' || '5': movieType = 'анимационный сериал';
        break;
      case 'tv-show' || '6': movieType = 'тв-шоу';
        break;
      case 'mini-series': movieType = 'мини-сериал';
        break;
      default: movieType = 'тип не указан';
    }

    return movieType
  }

}

// typeNumber: 1 (movie) | 2 (tv-series) | 3 (cartoon) | 4 (anime) | 5 (animated-series) | 6 (tv-show)
