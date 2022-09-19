import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core"

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() public totalPages!: number
  @Input() public page!: number
  @Output() public onCurrentPage: EventEmitter<number> = new EventEmitter<number>()

  constructor() {
  }

  ngOnInit(): void {
    console.log('TOTALPAGES: ', this.totalPages)
    console.log('PAGE: ', this.page)

    let newArr = this.fromNumToArr(100)
    console.log(newArr)
  }

  fromNumToArr(num: number): number[] {
    let newArr: number[] = []
    for (let i = 1; i <= num; i++) newArr.push(i)

    newArr = [...newArr.splice(0, 5), ...newArr.splice(newArr.length - 5, 5)]

    // let arr1: number[] = newArr.splice(0, 5)
    // console.log(arr1)
    // let arr2: number[] = newArr.splice(newArr.length - 5, 5)
    // console.log(arr2)
    // let arr3: number[] = [...arr1, ...arr2]
    // console.log(arr3)

    // newArr = newArr.splice(newArr.length - 5, 5) // newArr.splice(0, 5), newArr.splice(newArr.length - 5, 5)

    return newArr
  }

  transformTotalPages() {

  }


  changeCurrentPage(num: number) {
    if (this.page === num) return
    this.onCurrentPage.emit(num)
  }
  changePageArrowLeft() {
    if (this.page == 1) return
    this.page--
    this.onCurrentPage.emit(this.page)
  }
  changePageArrowRight() {
    if (this.page == this.totalPages) return
    this.page++
    this.onCurrentPage.emit(this.page)
  }
}

// TODO: ограничить количество отображаемых страниц !!!
