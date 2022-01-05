import { Injectable, OnInit } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { BehaviorSubject, map } from "rxjs";
import { Dish } from "../dishes/dish";
import firestore from 'firebase/compat/app'
import { AuthenticationService } from "../user-auth/authentication.service";
import { Item } from "../items/item";


@Injectable()
export class CartService implements OnInit {

    items: Item[] = [];
    dishes!: Dish[];
    private itemsSource = new BehaviorSubject(this.items);
    currentItems = this.itemsSource.asObservable();

    private cartsRef: AngularFirestoreCollection<any>
    userID: string = "";
    subscription: any;

    constructor(
        private authService: AuthenticationService,
        private db: AngularFirestore) {
        this.cartsRef = db.collection("carts");
        this.authService.userData.subscribe(user => {
            this.userID = user!.uid;
            let cartID = localStorage.getItem('cartID')
            if (!cartID){
                localStorage.setItem('cartID', this.userID);
                this.cartsRef.doc(this.userID).set({});
            }
        });
    }
    ngOnInit() {
    }

    async getItems() {
        let cartID = this.getCartID();
        const itemsRef = this.db.collection("carts").doc(cartID).collection("items");
        return itemsRef;
    }
    // create() {
    //     this.cartsRef.doc(this.userID).get().pipe(map(snapshot => {
    //         return snapshot.exists
    //     })).subscribe(exists =>{
    //         if (!exists){
    //             this.cartsRef.doc(this.userID).set({});
    //         }
    //         return this.userID;
    //     })
    // }
    getCartID() {
        let cartID = localStorage.getItem('cartID');
        return cartID!;
    }
    addToCart(dish: Dish) {
        const cartID = this.getCartID();
        const itemsRef = this.db.collection("carts").doc(cartID).collection("items");
        itemsRef.doc(dish.key).get().pipe(map(snapshot => {
            return snapshot.exists;
        })).subscribe(exist => {
            if (exist) {
                itemsRef.doc(dish.key).update({ item: dish, quantity: firestore.firestore.FieldValue.increment(1) });
            }
            else {
                itemsRef.doc(dish.key).set({ item: dish, quantity: 1 });
            }
        });
    }
    removeFromCart(dish: Dish) {
        const cartID = this.getCartID();
        const itemsRef = this.db.collection("carts").doc(cartID).collection("items");
        itemsRef.doc(dish.key).get().pipe(map(snapshot => {
            return snapshot.data();
        })).subscribe(data => {
            if (data != null) {
                if (data["quantity"] > 1) {
                    itemsRef.doc(dish.key).update({ item: dish, quantity: firestore.firestore.FieldValue.increment(-1) });
                }
                else {
                    itemsRef.doc(dish.key).delete();            
                }
            }
        });        
    }
    async isDishInCart(dish: Dish){
        const cartID = this.getCartID();
        const itemsRef = this.db.collection("carts").doc(cartID).collection("items");
        let isAny = false;
        await itemsRef.doc(dish.key).get().pipe(map(snapshot => {
            return snapshot.exists;
        })).forEach(a =>
            isAny = a
        )
        return isAny;
    }
    
}
