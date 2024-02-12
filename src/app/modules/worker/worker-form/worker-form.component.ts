import {Component, EventEmitter, Inject, inject, Input, OnInit, Output} from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from "@angular/forms";
import {WorkerData} from "../../../Shared/WorkerData.interface";
import {DialogRef} from "@angular/cdk/dialog";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {WorkerFormService} from "./worker-form.service";
import {toSignal} from "@angular/core/rxjs-interop";

export interface WorkerFormInterface {
  firstName: FormControl<string>,
  lastName: FormControl<string>,
  education: FormControl<string>,
  companyName: FormControl<string>,
}

@Component({
  selector: 'app-worker-form',
  templateUrl: './worker-form.component.html',
  styleUrl: './worker-form.component.css'
})
export class WorkerFormComponent implements OnInit{
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly dialogRef = inject(MatDialogRef<WorkerFormComponent>);
  private readonly formService = inject(WorkerFormService);
  universitiesObs$ = toSignal(this.formService.getUniversities());



  workerForm: FormGroup<WorkerFormInterface> = this.fb.group({
    firstName: this.fb.control('', Validators.required),
    lastName: this.fb.control('', Validators.required),
    education: this.fb.control(''),
    companyName: this.fb.control({value: '', disabled: true}, Validators.required)
  });

  constructor(@Inject(MAT_DIALOG_DATA) private data: WorkerData) {}

  ngOnInit(): void {
    console.log(this.data)
    if (this.data) {
      this.workerForm.controls.firstName.setValue(this.data.name)
      this.workerForm.controls.lastName.setValue(this.data.surname)
      if (this.data.companyName) {
        this.workerForm.controls.companyName.setValue(this.data.companyName)
      }
      if (this.data.education) {
        this.workerForm.controls.education.setValue(this.data.education)
      }
    }

  }

  handleDataEdit() {
    if (!this.workerForm.valid) {
      return
    }

    const result: WorkerData = {
      _id: this.data._id,
      companyId: this.data.companyId,
      name: this.workerForm.controls.firstName.value,
      surname: this.workerForm.controls.lastName.value,
      companyName: this.workerForm.controls.companyName.getRawValue(),
      education: this.workerForm.controls.education.value
    }
    console.log(result)

    this.dialogRef.close(result)
  }

  handleCancel() {
    this.dialogRef.close()
  }


}
