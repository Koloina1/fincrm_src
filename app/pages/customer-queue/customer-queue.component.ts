import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from '../../services/customer/customer.service';
import { Customer } from '../../models/customer.model';
import { User } from '../../models/user.model';
import { Router, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth/auth.service';
import { AngularFireDatabase  } from 'angularfire2/database';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-customer-queue',
  templateUrl: './customer-queue.component.html',
  styleUrls: ['./customer-queue.component.css']
})
export class CustomerQueueComponent implements OnInit {


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource;
  displayedColumns = ['phone','cin', 'both','residence','sides','iban','action'];
	customers: Customer[];
   public uid: string;
   public isLogin: boolean;
   public email: string;
  	constructor(
		public customerService: CustomerService,
    public router: Router, 
    private tostr: ToastrService,
    private db: AngularFireDatabase, 
    public authService: AuthService,
    public datepipe: DatePipe,
    private spinner: NgxSpinnerService
	) { 
  		this.init();
	}

  ngOnInit() {
    this.authService.getAuth().subscribe( auth => {
      if(auth){
        this.isLogin = true;
          this.email = auth.email;
          this.uid = auth.uid;
          this.spinner.show();
          setTimeout(() => {
            this.spinner.hide();
          }, 5000);
      }else{
        this.isLogin = false;
          this.router.navigate(['/login']);
      }
    })
  }

  init(){
    let customerList = [];
  	let customs = this.customerService.getAllCustomer();
    customs.snapshotChanges().subscribe(item => {
      item.forEach( element => {
        var custom = element.payload.toJSON();
        custom["key"] = element.key;
         customerList.push(custom);
      })
      this.dataSource = new MatTableDataSource(customerList.reverse());
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  validateCustomer(key){
    this.spinner.show();
      setTimeout(() => {
      this.spinner.hide();
      this.router.navigate(['registration/'+key]);
    }, 2000);
  }

}
