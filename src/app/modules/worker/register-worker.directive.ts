import {DestroyRef, Directive, HostListener, inject} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {PanelService} from "../panel/panel.service";
import {WorkerFormComponent} from "./worker-form/worker-form.component";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {filter, map, tap} from "rxjs";
import {WorkerData} from "../../Shared/WorkerData.interface";

export interface NewWorkerData {
  name: string,
  surname: string,
  companyId: string,
  university: string | undefined
}
@Directive({
  selector: '[appRegisterWorker]',
})
export class RegisterWorkerDirective {
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private readonly panelService = inject(PanelService);

  constructor() { }

  @HostListener('click') handleOpenRegisterForm() {

    const newWorkerData: WorkerData = {
      _id: "",
      companyId: this.panelService.currentCompany._id!,
      companyName: "",
      name: "",
      surname: "",
      university: ""

    }
      const dialogRef = this.dialog.open(WorkerFormComponent, {
        disableClose: true,
        hasBackdrop: true,
        data : {
          formData: newWorkerData,
          editAllMode: true
        }
      });

    dialogRef.afterClosed()
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          filter((data) => data),
          tap(data => console.log(data)),
          map((data: WorkerData): NewWorkerData => {
            return {
              name: data.name,
              surname: data.surname,
              companyId: data.companyId,
              university: data.university
            }
          }),
          tap(data => this.panelService.createWorker(data))
        )
        .subscribe()
    };
}
