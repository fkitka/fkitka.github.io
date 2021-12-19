import { PipeTransform, Pipe } from '@angular/core';
import { Dish } from '../dishes/dish';


@Pipe({
    name: 'filterdishes',
    pure: false,
})
export class FilterDishesPipe implements PipeTransform {
    transform(items: Dish[], cuisine: string, type: string, time: string, rating: number): Dish[] {
        return items.filter(item => {
            if (cuisine != item.cuisine && cuisine != ""){
                return false;
            }
            if (type != item.type && type != ""){
                return false;
            }
            if (time != item.time && time != ""){
                return false
            }
            if (rating != item.rating && rating != 0){
                return false;
            }
            return true;
        });
    }
}