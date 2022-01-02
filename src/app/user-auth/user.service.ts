import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import firebase from "firebase/compat/app";
import { Observable } from "rxjs";
import { AppUser } from "../app-user";

@Injectable()
export class UserService{
    userRef: AngularFirestoreCollection<any>;
    
    constructor(private db: AngularFirestore){
        this.userRef = db.collection('users');
    }
    getUser(uid: any): Observable<AppUser>{
      return this.userRef.doc(uid).valueChanges();
    }
    save(uid: string, email: string){
        this.userRef.doc(uid).set({
            email: email,
            admin: false,
            manager: false
        });    
    }
    setAdmin(uid: string){
        this.userRef.doc(uid).set({
            admin: true
        })
    }
    setManager(user: firebase.User){
        this.userRef.doc(user.uid).set({
            manager: true
        })
    }
}