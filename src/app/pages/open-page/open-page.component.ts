import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {NgOptimizedImage} from "@angular/common";
import {fromEvent, map, merge, of, Subscription} from "rxjs";
import {InternetConnectionService} from "../../Model/internet-connection.service";

@Component({
    selector: 'app-open-page',
    templateUrl: './open-page.component.html',
    standalone: true,
  imports: [
    RouterOutlet,
    NgOptimizedImage,
    RouterLink
  ],
    styleUrls: ['./open-page.component.css']
})
export class OpenPageComponent implements OnInit{
  online: boolean = true;
  constructor(private router: Router,private internetConnectionService: InternetConnectionService) { }

  ngOnInit(): void {

    this.internetConnectionService.getOnlineStatus().subscribe(online => {
      this.online = online;
      if (!online) {
        // Handle offline state here, for example, redirect to an offline page or display a message.
        console.log('You are offline');
        alert("You are offline. Some problems may occur.")
      }
      else {
        console.log('You are online');
        alert("You are online. Everything works fine.")
      }
    });

  }


}
