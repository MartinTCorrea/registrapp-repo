import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<any>;
  
  constructor(private afAuth:AngularFireAuth) {
      this.user$ = this.afAuth.authState; 
    }
    

  async login(email:string,password:string){
    return this.afAuth.signInWithEmailAndPassword(email,password);
}
  async register(email:string,password:string){
    return this.afAuth.createUserWithEmailAndPassword(email,password);
}
  async logout(){
    return this.afAuth.signOut();

}
  getUser(){
    return this.afAuth.user;
}
  getCurrentUserEmail() {
    return this.afAuth.authState.pipe(
      map(user => user ? user.email : null)
    );
  }
}
