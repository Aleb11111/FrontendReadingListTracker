import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InternetConnectionService {
  private onlineStatus: BehaviorSubject<boolean>;

  constructor() {
    this.onlineStatus = new BehaviorSubject<boolean>(navigator.onLine);
    window.addEventListener('online', () => this.updateOnlineStatus());
    window.addEventListener('offline', () => this.updateOnlineStatus());
  }

  private updateOnlineStatus() {
    this.onlineStatus.next(navigator.onLine);
  }

  getOnlineStatus(): Observable<boolean> {
    return this.onlineStatus.asObservable();
  }
}
