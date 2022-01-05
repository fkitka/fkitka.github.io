import { Injectable } from "@angular/core";
import { Dish } from "./dish";
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore'

@Injectable()
export class DishService {
    dish!: Dish;
    private dishRef: AngularFirestoreCollection<any>;
    constructor(db: AngularFirestore ) { 
        this.dishRef = db.collection('dishes');
    }
    setCurrentDish(dish: Dish){
        this.dish = dish;
    }
    createDish(dish: Dish){
        return this.dishRef.doc().set({...dish});
    }
    getDishesList(){
        return this.dishRef;
    }
    updateDish(key: string, value: any){
        return this.dishRef.doc(key).set(value);
    }
    deleteDish(key: string){
        return this.dishRef.doc(key).delete();
    }
}
