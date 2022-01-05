import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";
import { AppUser } from "../app-user";

@Injectable()
export class UserService{
    userRef: AngularFirestoreCollection<any>;    
    userID: string = "";
    constructor(private db: AngularFirestore){
        this.userRef = db.collection('users');
    }
    getUser(uid: any): Observable<AppUser>{
        this.userID = uid;
        return this.userRef.doc(uid).valueChanges();
    }
    getCurrentUserID(){
        return this.userID;
    }
    save(uid: string, email: string){
        this.userRef.doc(uid).set({
            key: uid,
            email: email,
            admin: false,
            manager: false,
            isDisabled: false,
        });    
    }
    setAdmin(user: AppUser){
        this.userRef.doc(user.key).update({
            admin: true
        })
    }
    setManager(user: AppUser){
        this.userRef.doc(user.key).update({
            manager: true
        })
    }
    unsetManager(user: AppUser) {
        this.userRef.doc(user.key).update({
            manager: false
        })
    }
    unsetAdmin(user: AppUser) {
        this.userRef.doc(user.key).update({
            admin: false
        })
    }
    getRegisteredUsers(){
        return this.userRef;
    }
    ban(user: AppUser) {
        this.userRef.doc(user.key).update({
              isDisabled: true
        });
    }
    unban(user: AppUser) {
        this.userRef.doc(user.key).update({
            isDisabled: false
        });
    }
}