import { Component, Input } from "@angular/core"
import { IKinopoisk } from "../../services/kinopoisk"

@Component({
  selector: 'app-movie-cards',
  templateUrl: './movie-cards.component.html',
  styleUrls: ['./movie-cards.component.scss']
})

export class MovieCardsComponent {
  @Input() public movie: IKinopoisk[] = []
  @Input() public title = ''
}

