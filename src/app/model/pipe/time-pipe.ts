import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'time_pipe'
})

export class TimePipe implements PipeTransform {
  transform(value: any): string {
    let currentTime = value.split(':')[0]
    let replaced = Number.parseInt(currentTime)+7 +':'+currentTime[1]
    return value;
  }
}
