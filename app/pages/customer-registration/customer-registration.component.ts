import { Component, OnInit, ViewChild  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CustomerService } from '../../services/customer/customer.service';
import { IndividualService } from '../../services/orchid/individual.service';
import { CustomerOrchService } from '../../services/orchid/customer-orch.service';
import { ActivatedRoute } from "@angular/router";
import { Customer } from '../../models/customer.model';
import { User } from '../../models/user.model';

import { CustomerOch } from '../../entity/customer-och';
import { Individual } from '../../entity/individual';

import { Router, Params } from '@angular/router';
import { ToastrService, ToastContainerDirective } from 'ngx-toastr';
import { AuthService } from '../../services/auth/auth.service';
import { AngularFireDatabase  } from 'angularfire2/database';
import { empty } from 'rxjs';
import { FocusMonitor } from '@angular/cdk/a11y';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-customer-registration',
  templateUrl: './customer-registration.component.html',
  styleUrls: ['./customer-registration.component.css']
})
export class CustomerRegistrationComponent implements OnInit {
   @ViewChild(ToastContainerDirective) toastContainer: ToastContainerDirective;
  	key: string;
  	customer: Customer;
    itemArray = []
    form: FormGroup;
    errorMessage: string = '';
    public uid: string;
    public isLogin: boolean;
    public email: string;
    public phone: string;
    public both: string;
    public sides: string;
    public residence: string;
    public cin:string;
    public step: any = 0;
    public vers:string
    public data:any;
  	constructor(
    public toastrService : ToastrService,
		public customerService: CustomerService,
		public route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder,
    private db: AngularFireDatabase, 
    public authService: AuthService,
    private individulaSrv: IndividualService,
    private customerSrv: CustomerOrchService,
    private spinner: NgxSpinnerService
	) {
      
      this.init();
      
	}

  ngOnInit() {
    this.toastrService.overlayContainer = this.toastContainer;
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
    this.form = this.formBuilder.group({
      clt_vnom: [null, Validators.required],
      ind_vprenom: [null, Validators.required],
      clt_ddate_in: [null],
      ind_vgenre: [null],
      ind_dnais: [null, Validators.required],
      ind_inais: [null, Validators.required],
      ind_vnais: [null, Validators.required],
      ind_vsitfam: [null],
      clt_vpays: [null],
      ind_vcin: [null],
      ind_dcin: [null, Validators.required],
      ind_vlcin: [null, Validators.required],
      ind_ddcin: [null],
      ind_vlieudupli: [null],
    });
    this.authService.getAuth().subscribe( auth => {
      if(auth){
        this.isLogin = true;
          this.email = auth.email;
          this.uid = auth.uid;
      }else{
        this.isLogin = false;
          this.router.navigate(['/login']);
      }
    })

    this.form.get('ind_dnais').valueChanges.subscribe(val => {
      this.vers = this.getFullYear(this.form.get('ind_dnais').value);
    });
  }

  finalizeStep() {
    if(this.form.value['clt_vnom'] && 
    this.form.value['ind_vprenom'] &&  
    this.form.value['ind_dnais']  &&
    this.form.value['ind_inais'] &&
    this.form.value['ind_vnais'] /*&&
    this.form.value['ind_vcin']*/) {
      this.step = 1;
    }else{
      this.validateAllFormFields(this.form);
      this.step = 0;
    }
  }

  init(){
  	this.route.params.subscribe( params => this.key = params.key );
    let customs = this.customerService.getAllCustomer();
    customs.snapshotChanges().subscribe( item => {

      item.forEach( element => {
        let custom = element.payload.toJSON();

        custom["key"] = element.key;
        console.log(this.key);
        console.log(element.key.split(" ").join(""));
        if(element.key.split(" ").join("") == this.key){
          this.itemArray.push(custom as Customer);
           console.log(this.itemArray[0].cin);
          try {
            this.cin = this.itemArray[0].cin.split(" - ").join("");
            this.phone = this.itemArray[0].phone;
            this.both = this.itemArray[0].pict.both;
            this.sides = this.itemArray[0].pict.sides;
            this.residence = this.itemArray[0].pict.residence;
          } catch (e) {

          }
        }
      })
    })
  }

  isFieldValid(field: string) {
    return !this.form.get(field).valid && this.form.get(field).touched;
  }
 
  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

  finishFunction(){
    
    if(this.form.valid){
      var individual: Individual = new Individual();
      var customerOch: CustomerOch = new CustomerOch();
      var date = new  Date(this.form.value['ind_dnais']);
      var date_:any = date.toLocaleDateString().split("/").join("-");
      var codeAgence:string = '0028';
      var numberClient:any = this.getclientId();
      var codeClient:any = "" + codeAgence + "" + numberClient;
      individual.indDnais = date_;
      individual.indInais = this.form.value['ind_inais'];
      individual.indVgenre = this.form.value['ind_vgenre'] ? this.form.value['ind_vgenre'] : "";
      individual.indVcintype = "cin";
      individual.indVcin = this.form.value['ind_vcin'];
      individual.indVcodeprof = "agri";
      individual.indVcodeclt = codeClient;

      customerOch.cltVcli = codeClient;
      customerOch.cltVcode =  codeClient;
      customerOch.cltVnom = this.form.value['clt_vnom'];
      customerOch.cltDdateIn = new Date(this.form.value['clt_ddate_in']).toLocaleDateString().split("/").join("-");
      customerOch.cltVpays = this.form.value['clt_vpays'] ? this.form.value['clt_vpays'] : "";
      customerOch.cltVtclient = "enc";
      customerOch.cltVcodeper = "per";
      customerOch.cltVcodeact = "act";
      customerOch.cltVcodeute =  codeAgence;
      console.log("individual");
      console.log(individual);
      console.log("customer");
      console.log(customerOch);
      //this.save(individual, customerOch);
    }else{
      console.log(this.form.value);
      this.validateAllFormFields(this.form);
    }
  }

  getFullYear(date:any) :any{
    return new Date(date).getFullYear();
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      console.log(field);
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  save(individual:Individual, customerOch:CustomerOch) {
    this.customerSrv.addCustomer(customerOch).subscribe((response) => {
      console.log(response['status']);
        this.toast(response);
        this.individulaSrv.addIndividual(individual).subscribe((response) => {
        console.log(response);
        this.toast(response);
      })
    })
    
  }

  toast(response : any) {
    if(response['status'] == "201" || response['status'] == "200")
      this.toastrService.success("Envoie reussi");
    else 
      this.toastrService.error("Erreur");
  }

   getclientId() :number {
    var min : number = Math.ceil(0);
    var max : number = Math.floor(99999);
    return Math.floor(Math.random() * (max - min +1)) + min;
  }
}
