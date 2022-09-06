import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'movieType'
})
export class MovieTypePipe implements PipeTransform {

  transform(movieType: string): string {

    switch (movieType) {
      case 'movie': movieType = 'фильм'
        break
      case '1': movieType = 'Фильмы'
        break
      case 'tv-series': movieType = 'сериал'
        break
      case '2': movieType = 'Сериалы'
        break
      case 'cartoon': movieType = 'мультфильм'
        break
      case '3': movieType = 'Мультфильмы'
        break
      case 'anime': movieType = 'аниме'
        break
      case '4': movieType = 'Аниме'
        break
      case 'animated-series': movieType = 'анимационный сериал'
        break
      case '5': movieType = 'Анимационные сериалы'
        break
      case 'tv-show': movieType = 'тв-шоу'
        break
      case '6': movieType = 'ТВ-шоу'
        break
      case 'mini-series': movieType = 'мини-сериал'
        break
      case '7': movieType = 'Мини-сериалы'
        break
      default: movieType = 'тип не указан'
    }

    return movieType
  }

}

// typeNumber: 1 (movie) | 2 (tv-series) | 3 (cartoon) | 4 (anime) | 5 (animated-series) | 6 (tv-show)
