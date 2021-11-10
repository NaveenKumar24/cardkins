import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { PreFillService } from '../../pre-fill.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-popup',
  templateUrl: './modal-popup.component.html',
  styleUrls: ['./modal-popup.component.scss']
})
export class ModalPopupComponent implements OnInit {

  students$ = new BehaviorSubject<any[]>([]);
  filteredStudents$ = new BehaviorSubject<any[]>([]);

  sexFilterControl = new FormControl();

  programCategoryFilterControl = new FormControl();
  programStatusFilterControl = new FormControl();
  programControls = new FormGroup({
    ProgramCategory: this.programCategoryFilterControl,
    ProgramStatus: this.programStatusFilterControl
  });

  
  data:any;
  dataSource = new MatTableDataSource<any>();
  constructor(private prefillService: PreFillService,public dialogRef: MatDialogRef<ModalPopupComponent>) { }

  ngOnInit(): void {
    // debugger;
    this.data = this.prefillService.getUserWiseData();
    console.log(this.data)
    this.students$.next(this.data);
    this.dataSource.data = this.data;
    this.setFilters();
  }
  private setFilters() {
    this.filteredStudents$.next(this.students$.value);
    
    combineLatest(
      this.students$,
      this.sexFilterControl.valueChanges,
      this.programControls.valueChanges
    )
    .subscribe(([students, sexFilter, programFilters]) => {
      let filteredStudents = [ ... students ];

      if (sexFilter) {
        filteredStudents = filteredStudents.filter(student => student.Sex === sexFilter);
      }

      filteredStudents = filteredStudents.filter(student => {
        return student.Programs.reduce((programsPrev, program) => {
          
          return programsPrev || Object.entries(programFilters).reduce((filterPrev, [filterName, filterValue]) => {
            
            if (!filterValue) {
              return filterPrev;
            }
            return filterPrev && program[filterName] === filterValue;

          }, true);
          
        }, false)
      });

      this.filteredStudents$.next(filteredStudents);

    });
    this.sexFilterControl.setValue('');
    this.programCategoryFilterControl.setValue('');
    this.programStatusFilterControl.setValue('');
  }

  closeDialogue() {
    this.dialogRef.close();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
 

  // private getStudents() {
  //   return JSON.parse(`
  //   [
  //     {
  //         "StudentId": 1,
  //         "StudentName": "Student1",
  //         "Sex":"M",
  //         "Programs": [
  //             {
  //                 "StudentId": 1,
  //                 "ProgramName": "Java",
  //                 "ProgramCategory": "Engineering",
  //                 "ProgramStatus": "Full Time"
  //             },
  //             {
  //                 "StudentId": 1,
  //                 "ProgramName": "HR Management 2",
  //                 "ProgramCategory": "HR",
  //                 "ProgramStatus": "Part Time"
  //             },
  //             {
  //                 "StudentId": 1,
  //                 "ProgramName": "Accounting 1",
  //                 "ProgramCategory": "Finance",
  //                 "ProgramStatus": "Full Time"
  //             }
  //         ]
  //      },
  //     {
  //         "StudentId": 2,
  //         "StudentName": "Student2",
  //         "Sex":"F",
  //         "Programs": [
  //             {
  //                 "StudentId": 2,
  //                 "ProgramName": "HR Management 1",
  //                 "ProgramCategory": "HR",
  //                 "ProgramStatus": "Part Time"
  //             },
  //             {
  //                 "StudentId": 2,
  //                 "ProgramName": "Accounting 3",
  //                 "ProgramCategory": "Finance",
  //                 "ProgramStatus": "Full Time"
  //             }
  //         ]
  //      },
  //     {
  //         "StudentId": 3,
  //         "StudentName": "Student3",
  //         "Sex":"F",
  //         "Programs": [
  //             {
  //                 "StudentId": 3,
  //                 "ProgramName": "Java 3",
  //                 "ProgramCategory": "Engineering",
  //                 "ProgramStatus": "Full Time"
  //             }
  //         ]
  //      },
  //     {
  //         "StudentId": 4,
  //         "StudentName": "Student4",
  //         "Sex":"M",
  //         "Programs": [
  //             {
  //                 "StudentId": 4,
  //                 "ProgramName": "Java 2",
  //                 "ProgramCategory": "Engineering",
  //                 "ProgramStatus": "Full Time"
  //             },
  //             {
  //                 "StudentId": 4,
  //                 "ProgramName": "Accounting 2",
  //                 "ProgramCategory": "Finance",
  //                 "ProgramStatus": "Part Time"
  //             }
  //         ]
  //      },
  //      {
  //         "StudentId": 5,
  //         "StudentName": "Student5",
  //         "Sex":"M",
  //         "Programs": [
  //             {
  //                 "StudentId": 5,
  //                 "ProgramName": "JavaScript",
  //                 "ProgramCategory": "Engineering",
  //                 "ProgramStatus": "Part Time"
  //             },
  //             {
  //                 "StudentId": 5,
  //                 "ProgramName": "HR Management 5",
  //                 "ProgramCategory": "HR",
  //                 "ProgramStatus": "Full Time"
  //             }
  //         ]
  //      }
  // ]
  //   `);
  // }

  private getNoOfArchivedCards() {
    return JSON.parse(`
    [
      {
                "Active": true,
                "CardFirstName": "Hshs",
                "CardLastName": "",
                "CardMiddleName": "Zhhs",
                "CardName": null,
                "CompanyAddress": "Ahahh",
                "CompanyAreaCode": null,
                "CompanyCity": null,
                "CompanyCountry": null,
                "CompanyName": "Card2",
                "CompanyState": null,
                "CreatedBy": "Manjunatha",
                "CreatedDatetime": "2021-05-31T11:41:25.597",
                "EndMonth": 6,
                "EndYear": 2016,
                "Fax": null,
                "Idv": 52,
                "Industry": "Community Services & Development",
                "IsArchived": true,
                "IsDefault": false,
                "IsVerified": false,
                "ModifiedBy": "Manjunatha",
                "ModifiedDatetime": "2021-05-31T12:27:59.097",
                "OfficeCountryCode": null,
                "OfficeMobileNo": "4664646464",
                "OfficePhoneNumber": null,
                "PrimaryEmail": "vVGH",
                "Salutation": null,
                "SecondaryEmail": "bBH",
                "Service": "Information Technology",
                "StartMonth": 5,
                "StartYear": 2018,
                "Title": "Hshsh",
                "UserProfileId": 100,
                "Website": "Hhaahh"
        }
      ]
    `);
  }
  // private getNoOfArchivedCards() {
  //   return JSON.parse(`
  //     [
  //       {
  //         Active: true,
  //         CardFirstName: "Hshs",
  //         CardLastName: "",
  //         CardMiddleName: "Zhhs",
  //         CardName: null,
  //         CompanyAddress: "Ahahh",
  //         CompanyAreaCode: null,
  //         CompanyCity: null,
  //         CompanyCountry: null,
  //         CompanyName: "Card2",
  //         CompanyState: null,
  //         CreatedBy: "Manjunatha",
  //         CreatedDatetime: "2021-05-31T11:41:25.597",
  //         EndMonth: 6,
  //         EndYear: 2016,
  //         Fax: null,
  //         Id: 52,
  //         Industry: "Community Services & Development",
  //         IsArchived: true,
  //         IsDefault: false,
  //         IsVerified: false,
  //         ModifiedBy: "Manjunatha",
  //         ModifiedDatetime: "2021-05-31T12:27:59.097",
  //         OfficeCountryCode: null,
  //         OfficeMobileNo: "4664646464",
  //         OfficePhoneNumber: null,
  //         PrimaryEmail: "vVGH",
  //         Salutation: null,
  //         SecondaryEmail: "bBH",
  //         Service: "Information Technology",
  //         StartMonth: 5,
  //         StartYear: 2018,
  //         Title: "Hshsh",
  //         UserProfileId: 100,
  //         Website: "Hhaahh",
  //       }
  //     ]
  //   `)
  // }
}
