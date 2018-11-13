import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { AngularFireDatabase  } from 'angularfire2/database';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public isLogin: boolean;
  public email: string;

  constructor(public router: Router, private db: AngularFireDatabase, public authService: AuthService) { }

  ngOnInit() {
    this.authService.getAuth().subscribe( auth => {
     if(auth){
          this.isLogin = true;
          this.email = auth.email;
      }else{
          this.isLogin = false;
          this.router.navigate(['/login']);
      }
    })
  }

  onClickLogout(){
  	this.authService.doLogout()
    .then((res) => {
      this.router.navigate(['/login']);
    }, (error) => {
      console.log("Logout error", error);
    });
  }

}
