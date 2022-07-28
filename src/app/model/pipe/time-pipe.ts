import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'time_pipe'
})

export class TimePipe implements PipeTransform {
  transform(value: any): string {
    let currentHour = value[0]
    let replaced = ''
    if (currentHour <= 5) {
      replaced = value.replace(value[0], Number.parseInt(value[0])+7);
    }
    else {
      replaced = value.replace(value[0], value[0]);
    }
    return replaced;
  }
}
