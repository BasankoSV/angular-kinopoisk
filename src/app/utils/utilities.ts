import {IKinopoisk} from "../services/kinopoisk"

export function statisticsLog(components: string, docs: IKinopoisk[], total: number, limit: number, page:number, pages:number):void {
  console.group('Статистика по полученным данным из', components)
  console.log('Получено: ', docs.length + ' объекта(ов)')
  console.log('Всего найдено: ', total + ' объекта(ов)')
  console.log('Лимит выдачи: ', limit + ' объекта(ов) на страницу')
  console.log('Текущая страница номер: ', page)
  console.log('Всего страниц: ', pages + ' штук')
  console.groupEnd()
}

export function getMovieType(movieType: string): string {
  switch (movieType) {
    case '1': movieType = 'Фильмы'
      break
    case '2': movieType = 'Сериалы'
      break
    case '3': movieType = 'Мультфильмы'
      break
    case '4': movieType = 'Аниме'
      break
    case '5': movieType = 'Анимационные сериалы'
      break
    case '6': movieType = 'ТВ-шоу'
      break
    case '7': movieType = 'Мини-сериалы'
      break
    default: movieType = 'тип не указан'
  }
  return movieType
}

export function getRandomNumber(min: number, max:number):number {
  let randomNumber = 0
  randomNumber = Math.round(Math.random() * (max - min) + min)
  randomNumber === 6 ? randomNumber = 7 : randomNumber // exclude number 6
  return randomNumber
}
