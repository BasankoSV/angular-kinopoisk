import { Component, Input } from "@angular/core"
import { IKinopoisk } from "../../services/kinopoisk"

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  @Input() movie!: IKinopoisk
}
