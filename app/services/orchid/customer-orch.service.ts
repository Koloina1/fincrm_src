import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { CustomerOch } from '../../entity/customer-och';

@Injectable({
  providedIn: 'root'
})
export class CustomerOrchService {

   url = 'http://127.0.0.1:8000/api'
   //url  = 'http://192.168.1.250:8001/web/app_dev.php/api';

  constructor(protected http: HttpClient) { 
  }

  public add(entity: any, endpoint: string) : Observable<any> {
      let formData = new FormData();
      let keys = Object.keys(entity);
      keys.forEach((key) => {
        formData.append(key, entity[key])
      })
      return this.http.post<any>(`${this.url}/${endpoint}`, formData).pipe(
        tap((customer: any) => catchError(this.handleError('add')))
      );
  }

  public addCustomer(customer: CustomerOch) : Observable<CustomerOch> {
      
      return this.add(customer, 'customer/add');
  }

  private handleError<T>(operation = 'operation', result?: T) {
  	return (error: any): Observable<T> => {
  		console.error(error);
  		return of(result as T);
  	}
  }
}
