import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core"
import { fromNumberToArray } from "../../utils/utilities"

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() public totalPagesNumber!: number
  @Input() public currentPage!: number
  @Output() public onCurrentPage: EventEmitter<number> = new EventEmitter<number>()

  public totalPagesArray: number[] = []
  private amountPages = 7

  ngOnInit(): void {
    this.initPagesArray()
  }

  initPagesArray() {
    this.totalPagesArray = fromNumberToArray(this.totalPagesNumber)
    if (this.totalPagesNumber <= this.amountPages) return
    this.totalPagesArray = this.totalPagesArray.splice(0, this.amountPages)
  }

  changeCurrentPage(page: number) {
    this.currentPage = page
    this.onCurrentPage.emit(page)
  }

  arrowDirection(direction: string) {
    switch (direction) {
      case 'left':
        if (this.currentPage == 1) return
        this.currentPage--
        if ((this.currentPage < this.totalPagesNumber - 2) && this.currentPage > 3){ //Math.floor(this.amountPages / 2) // 7 = 3
          this.totalPagesArray =
            fromNumberToArray(this.totalPagesNumber)
              .slice(this.currentPage - 4, this.currentPage + 3)
        }
        this.onCurrentPage.emit(this.currentPage)
        break
      case 'right':
        if (this.currentPage == this.totalPagesNumber) return
        if (this.currentPage > 3 && (this.currentPage + 3 < this.totalPagesNumber)){ //Math.floor(this.amountPages / 2) // 7 = 3
          this.totalPagesArray =
            fromNumberToArray(this.totalPagesNumber)
              .slice(this.currentPage - 3, this.currentPage + 4)
        }
        this.currentPage++
        this.onCurrentPage.emit(this.currentPage)
        break
      case 'first':
        if (this.currentPage == 1) return
        this.currentPage = 1
        this.totalPagesArray = fromNumberToArray(this.totalPagesNumber).splice(0, this.amountPages)
        this.onCurrentPage.emit(this.currentPage)
        break
      case 'last':
        if (this.currentPage == this.totalPagesNumber) return
        this.currentPage = this.totalPagesNumber
        this.totalPagesArray =
          fromNumberToArray(this.totalPagesNumber)
            .splice(-this.amountPages, this.amountPages)
        this.onCurrentPage.emit(this.currentPage)
        break
    }
  }
}
