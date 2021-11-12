import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { PreFillService } from '../../pre-fill.service';
import { MatIconModule } from '@angular/material/icon';

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
  isActive = false;
  isInactive = false;
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
}

