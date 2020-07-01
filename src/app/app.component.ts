import { TokenStorageService } from './_services/token-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'treningi-front';
  isLoggedIn:boolean;
  username: string;

  constructor(
    public tokenStorage: TokenStorageService
  ){ }

  ngOnInit(){
    this.isLoggedIn= !!this.tokenStorage.getToken();
    if(this.isLoggedIn){
      this.username= this.tokenStorage.getUser().username;
    }
  }

  logout(){
    this.tokenStorage.signOut();
    window.location.reload();
  }

}
