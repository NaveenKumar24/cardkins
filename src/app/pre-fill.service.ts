import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreFillService {
  userId: any;
  roleId:any;
  userCardId:any;

  constructor() { }

  setUserId(userId: number) {
    this.userId = userId;
  }

  getUserId():number {
      return this.userId;
  }

  setRoleId(roleId: number) {
    this.roleId = roleId;
  }

  getRoleId():number {
    return this.roleId;
  }

  setUserCardId(userCardId: number) {
    this.userCardId = userCardId;
  }
  getUserCardId():number {
    return this.userCardId
  }
}
