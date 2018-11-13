import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export abstract class FirebaseService {

  
	protected __path: string;

  	constructor(
		public firebase: AngularFireDatabase
	) { }

	getOne(id: string){
		return new Promise((resolve)=>{
			this.firebase.object(`${this.__path}/${id}`).snapshotChanges().subscribe((result)=>{
				resolve(result);
			})
		})
	}

	getAll(){
       return this.firebase.object(this.__path).valueChanges();
    }
}
