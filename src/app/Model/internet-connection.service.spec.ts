import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InternetConnectionService {
  private _isOnline: boolean;

  constructor() {
    this._isOnline = navigator.onLine;
    window.addEventListener('online', () => {
      this._isOnline = true;
    });

    window.addEventListener('offline', () => {
      this._isOnline = false;
    });
  }

  get isOnline(): boolean {
    return this._isOnline;
  }
}
