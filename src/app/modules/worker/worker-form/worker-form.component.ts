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
import {UniversitiesService} from "./universities.service";
import {toSignal} from "@angular/core/rxjs-interop";

export interface WorkerFormInterface {
  firstName: FormControl<string>,
  lastName: FormControl<string>,
  university: FormControl<string>,
  companyName: FormControl<string>,
}

export interface WorkerDialogInterface {
  formData: WorkerData,
  editAllMode: boolean
}

@Component({
  selector: 'app-worker-form',
  templateUrl: './worker-form.component.html',
  styleUrl: './worker-form.component.css'
})
export class WorkerFormComponent implements OnInit {// można rozbić na 2 komponenty POPUP i FORM
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly dialogRef = inject(MatDialogRef<WorkerFormComponent>);
  private readonly universitiesService = inject(UniversitiesService);
  universitiesObs$ = toSignal(this.universitiesService.getUniversities());
  workerForm: FormGroup<WorkerFormInterface> = this.fb.group({
    firstName: this.fb.control('', Validators.required),
    lastName: this.fb.control('', Validators.required),
    university: this.fb.control(''),
    companyName: this.fb.control({value: '', disabled: true}, Validators.required)
  });

  constructor(@Inject(MAT_DIALOG_DATA) private data: WorkerDialogInterface) {}

  ngOnInit(): void {
    console.log(this.data)
    if (this.data.formData) {
      // można zrobić this.workerFOrm.patchValue()
      this.workerForm.controls.firstName.setValue(this.data.formData.name)
      this.workerForm.controls.lastName.setValue(this.data.formData.surname)
      if (this.data.formData.companyName) {
        this.workerForm.controls.companyName.setValue(this.data.formData.companyName)
      }
      if (this.data.formData.university) {
        this.workerForm.controls.university.setValue(this.data.formData.university)
      }
    }

    if (!this.data.editAllMode) {
      this.workerForm.disable();
      this.workerForm.controls.university.enable()
    }

  }

  handleDataEdit() {
    if (!this.workerForm.valid) {
      return
    }

    // implement new worker data
    // {
    //   "name": "Paul",
    //   "surname": "Badman",
    //   "companyId": "{{company}}",
    //   "university": "Uniwersytet Jagielloński"
    // }
    const result: WorkerData = {
      _id: this.data.formData._id,
      companyId: this.data.formData.companyId,
      name: this.workerForm.controls.firstName.value,
      surname: this.workerForm.controls.lastName.value,
      companyName: this.workerForm.controls.companyName.getRawValue(),
      university: this.workerForm.controls.university.value
    }

    this.dialogRef.close(result)
  }

  handleCancel() {
    this.dialogRef.close()
  }


}
