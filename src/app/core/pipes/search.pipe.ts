import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(notes: any[], value: string): any {
    return notes.filter((note) =>
      note.title.toLowerCase().includes(value.toLowerCase())
    );
  }
}
