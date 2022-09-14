import { Pipe, PipeTransform } from "@angular/core"

@Pipe({
  name: 'fromNumberToArray'
})
export class FromNumberToArrayPipe implements PipeTransform {

  transform(num: number): number[] {
    const newArr: number[] = []
    for (let i = 1; i <= num; i++) newArr.push(i)
    return newArr
  }
}
