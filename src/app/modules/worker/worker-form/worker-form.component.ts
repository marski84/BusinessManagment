import {Component, EventEmitter, Inject, inject, Input, OnInit, Output} from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from "@angular/forms";
import {WorkerData} from "../../../Shared/WorkerData.interface";
import {DialogRef} from "@angular/cdk/dialog";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

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
      this.workerForm.controls.companyName.setValue(this.workerData.companyName)
      if (this.workerData.education) {
        this.workerForm.controls.education.setValue(this.workerData.education)
      }
    }

  }

  handleDataEdit() {
    if (!this.workerForm.valid) {
      return
    }

    return {...this.workerData, ...this.workerForm.getRawValue()}
  }


}
