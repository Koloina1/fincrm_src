import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { AngularFireDatabase  } from 'angularfire2/database';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public router: Router, private db: AngularFireDatabase, public authService: AuthService) { }

  ngOnInit() {
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
