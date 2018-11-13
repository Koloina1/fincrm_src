import { Injectable } from "@angular/core";
import 'rxjs/add/operator/toPromise';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user.model';
import * as firebase from 'firebase/app';
import { ToastrService } from 'ngx-toastr';
import 'rxjs/add/operator/map';
 
@Injectable()
export class AuthService {
 
  userList: AngularFireList<any>;
  selectedUser: User = new User();
 
  constructor(
   public afAuth: AngularFireAuth,
   private db: AngularFireDatabase,
   private tostr: ToastrService
 ){}
 
 
  doLogin(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }
      , err => reject(err))
    })
  }
 
  doLogout(){
    return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser){
        this.afAuth.auth.signOut()
        resolve();
      }
      else{
        reject();
      }
    });
  }
  getAuth() {
    return this.afAuth.authState.map(auth => auth);
  }
 
  getData(){
    this.userList = this.db.list('infos');
    return this.userList;
  }
  resetPassword(value) {
    var auth = firebase.auth();
    return auth.sendPasswordResetEmail(value.email)
      .then(test => {
        this.tostr.error('un email vous a été envoyé', 'success: ',{
        toastClass: "toast border-green",
        positionClass:'bottom-error',
        titleClass: "title-error",
        });
      }
      ,error =>{
        console.log(error)
        switch (error.code) {
          case "auth/user-not-found":
            this.tostr.error('Adresse email inexistant', 'Error: ',{
            toastClass: "toast border-green",
            positionClass:'bottom-success',
            titleClass: "title-error",
            });
            break;
          }
      })
  }
 
 
}