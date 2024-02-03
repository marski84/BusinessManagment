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
  private readonly workerData: WorkerData;
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly dialogRef = inject(MatDialogRef<WorkerFormComponent>);


  workerForm: FormGroup<WorkerFormInterface> = this.fb.group({
    firstName: this.fb.control('', Validators.required),
    lastName: this.fb.control('', Validators.required),
    education: this.fb.control(''),
    companyName: this.fb.control({value: '', disabled: true}, Validators.required)

  });

  constructor(@Inject(MAT_DIALOG_DATA) private data: WorkerData) {
    this.workerData = data;

  }
  ngOnInit(): void {
    console.log(this.workerData)
    if (this.workerData) {
      this.workerForm.controls.firstName.setValue(this.workerData.name)
      this.workerForm.controls.lastName.setValue(this.workerData.surname)
      if (this.workerData.companyName) {
        this.workerForm.controls.companyName.setValue(this.workerData.companyName)
      }
      if (this.workerData.education) {
        this.workerForm.controls.education.setValue(this.workerData.education)
      }
    }

  }

  handleDataEdit() {
    if (!this.workerForm.valid) {
      return
    }

    const result: WorkerData = {
      _id: this.workerData._id,
      companyId: this.workerData.companyId,
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
