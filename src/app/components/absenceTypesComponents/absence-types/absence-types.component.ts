import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AbsencesTypes } from 'src/app/models/absencesTypesModel/absences-types.model';
import { AbsenceTypesService } from 'src/app/services/absenceTypesService/absence-types.service';
import { LoadingDialogComponent } from '../../dialogs/loading-dialog/loading-dialog.component';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AbsenceTypeAddDialogComponent } from '../../dialogs/absence-type-add-dialog/absence-type-add-dialog.component';
import { AbsenceEditDialogComponent } from '../../dialogs/absence-edit-dialog/absence-edit-dialog.component';
import { AbsenceTypeEditDialogComponent } from '../../dialogs/absence-type-edit-dialog/absence-type-edit-dialog.component';
import { AbsenceTypeDeleteDialogComponent } from '../../dialogs/absence-type-delete-dialog/absence-type-delete-dialog.component';

@Component({
  selector: 'app-absence-types',
  templateUrl: './absence-types.component.html',
  styleUrls: ['./absence-types.component.scss']
})
export class AbsenceTypesComponent implements OnInit {
  absenceTypes: AbsencesTypes[] = [];
  displayedColumns: string[] = [
    'id',
    'name',
    'editColumn',
    'deleteColumn',
  ];
  loadingDialogRef: MatDialogRef<LoadingDialogComponent>;
  @ViewChild('absenceTypesTable') table: MatTable<AbsencesTypes>;
  @ViewChild('paginator') paginator: MatPaginator;
  constructor(private absenceTypesService: AbsenceTypesService, private dialog: MatDialog) { }

  dataSource = new MatTableDataSource(this.absenceTypes);

  ngOnInit(): void {
    this.openLoadingDialog("Távolmaradás típusok betöltése...");
    this.getAbsenceTypes();
  }

  getAbsenceTypes(): void {
    this.absenceTypesService.getAll()
      .subscribe(
        data => {
          this.absenceTypes = data;
          this.dataSource = new MatTableDataSource(this.absenceTypes);
          this.dataSource.paginator = this.paginator;
          this.closeLoadingDialog();
          this.table.renderRows();
        },
        error => {
          console.log(error);
        }
      );
  }

  openAddAbsenceTypesDialog(): void {
    const dialogRef = this.dialog.open(AbsenceTypeAddDialogComponent, {
      disableClose: true,
      width: '700px',
      height: '350px',
      data: {
        absenceType: AbsencesTypes,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result.absenceType.name != null || result.absenceType.name != '') {
        this.openLoadingDialog("Távolmaradás hozzadása...");
        this.absenceTypesService.create(result.absenceType)
          .subscribe(
            () => {

              this.openLoadingDialog("Távolmaradások betöltése...");
              this.getAbsenceTypes();
              this.closeLoadingDialog();
              this.table.renderRows();
            },
            error => {
              console.log(error);
            }
          );
      }
    })
  }

  openEditAbsenceDialog(absenceType: AbsencesTypes): void {
    const dialogRef = this.dialog.open(AbsenceTypeEditDialogComponent, {
      disableClose: true,
      width: '700px',
      height: '350px',
      data: {
        absenceType: absenceType,
        editFormSubmitted: false
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result.editFormSubmitted) {
        this.openLoadingDialog("Távolmaradás mentése...");
        this.absenceTypesService.update(result.absenceType.id, result.absenceType)
          .subscribe(
            () => {
              this.openLoadingDialog("Távolmaradások betöltése...");
              this.getAbsenceTypes();
              this.closeLoadingDialog();
              this.table.renderRows();
            },
            error => {
              console.log(error);
            }
          );
      }
    });
  }

  openDeleteAbsenceTypeDialog(absenceType: AbsencesTypes): void {
    const dialogRef = this.dialog.open(AbsenceTypeDeleteDialogComponent, {
      disableClose: true,
      data: {
        deleteRequired: false,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result.deleteRequired) {
        this.openLoadingDialog("Távolmaradás törlése...");
        this.absenceTypesService.delete(absenceType.id)
          .subscribe(
            () => {
              this.openLoadingDialog("Távolmaradások betöltése...");
              this.getAbsenceTypes();
              this.closeLoadingDialog();
              this.table.renderRows();
            },
            error => {
              console.log(error);
            }
          );
      }
    });
  }

  openLoadingDialog(message: string) {
    this.dialog.open(LoadingDialogComponent, {
      disableClose: true,
      data: {
        message: message,
      },
    });
  }

  closeLoadingDialog() {
    this.dialog.closeAll();
  }

}
