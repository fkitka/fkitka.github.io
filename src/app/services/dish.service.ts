import { Injectable } from "@angular/core";
import { Dish } from "../dishes/dish";
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore'

@Injectable()
export class DishService {
    dish!: Dish;
    private dishRef: AngularFirestoreCollection<any>;
    constructor(db: AngularFirestore ) { 
        this.dishRef = db.collection('dishes_v');
    }
    setCurrentDish(dish: Dish){
        this.dish = dish;
    }
    createDish(dish: Dish){
        this.dishRef.doc(dish.name).set({...dish});
    }
    getDishesList(){
        return this.dishRef;
    }
    updateDish(key: string, value: any){
        this.dishRef.doc(key).set(value);
    }
    deleteDish(key: string){
        this.dishRef.doc(key).delete();
    }
}
