import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'imagen',
  standalone: false
})

export class ImagenPipe implements PipeTransform {
  
  apiUrl = environment.apiUrl;

  transform(img: string, userId: string): string {
    return `${this.apiUrl}/posts/imagen/${userId}/${img}`;
  }

}
