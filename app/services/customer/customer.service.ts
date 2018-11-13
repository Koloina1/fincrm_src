import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { FirebaseService } from '../firebase/firebase.service';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends FirebaseService{

  	
	protected __path = 'newCustomer';
    customerLIst: AngularFireList<any>;
  	constructor(
  		public firebase: AngularFireDatabase
	) { 
  		super(firebase);
  	}

  	findAll(){
  		return this.getAll();
  	}

    findOne(key){
      return this.getOne(key);
    }
    getAllCustomer(){
      this.customerLIst = this.firebase.list(`${this.__path}`);
      return this.customerLIst;
    }
}
