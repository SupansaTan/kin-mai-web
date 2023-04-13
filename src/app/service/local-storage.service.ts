import { LocalStorageKey } from './../../constant/local-storage-key.constant';
import { LocalStorageModel } from 'src/models/local-storage.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private isLogin = new BehaviorSubject<boolean>(false);
  public storageSubObs = this.isLogin.asObservable();

  constructor() { }

  getUserIsLogin(): Observable<boolean> {
    let user = localStorage.getItem(LocalStorageKey.userName);
    this.isLogin.next(!(user === null));
    return this.storageSubObs;
  }

  get<Type>(key: string): Type | null {
    let result = null;
    let typeGetValue = localStorage.getItem(key);
    if (typeGetValue != null) {
      try {
        result = JSON.parse(typeGetValue) as Type;
      } catch (error) {
        result = <Type>(<unknown>typeGetValue);
      }
    }
    return result;
  }

  set<Type>(key: string, value: Type): void {
    localStorage.setItem(key, JSON.stringify(value));

    if (key === LocalStorageKey.userName) {
      this.getUserIsLogin();
    }
  }

  setBulk(keyPairsSet: Array<LocalStorageModel>): void {
    keyPairsSet.forEach((item) => this.set(item.Key, item.Value));
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }

  removeAll(): void {
    localStorage.clear();
  }
}
