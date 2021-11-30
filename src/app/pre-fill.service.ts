import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreFillService {
  userId: any;
  roleId: any;
  userCardId: any;
  userWiseReportData: any;
  userWiseMetaTags: any;
  userWiseMetaTagsReport: any;
  NoOProfileCardUserId: any;
  Href:any;
  noOfScannedCards:any;

  constructor() { }

  setUserId(userId: number) {
    this.userId = userId;
  }

  getUserId(): number {
    return this.userId;
  }

  setRoleId(roleId: number) {
    this.roleId = roleId;
  }

  getRoleId(): number {
    return this.roleId;
  }

  setUserCardId(userCardId: number) {
    this.userCardId = userCardId;
  }
  getUserCardId(): number {
    return this.userCardId
  }

  setUserWiseData(userWiseReportData: any) {
    this.userWiseReportData = userWiseReportData;
  }

  getUserWiseData(): any {
    return this.userWiseReportData;
  }


  setNoOProfileCards(NoOProfileCardUserId: any) {
    this.NoOProfileCardUserId = NoOProfileCardUserId;
  }

  getNoOProfileCards(): number {
    return this.NoOProfileCardUserId;
  }

  setHref(href: any) {
    this.Href = href;
  }

  getHref(): any {
    return this.Href;
  }

  // setScannedData(noOfScannedCards: any) {
  //     this.noOfScannedCards = noOfScannedCards;
  // }

  // getScanne
  // setUserWiseMetaTagsData(userWiseMetaTagsReport: any) {
  //     this.userWiseMetaTagsReport = userWiseMetaTagsReport
  // }



  // setUserWiseMetaTagsReport(userWiseMetaTags: any) {
  //   this.userWiseMetaTags = userWiseMetaTags;
  // }

  // getUser
}
