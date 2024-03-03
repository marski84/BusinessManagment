import {Component, EventEmitter, Inject, inject, Input, OnInit, Output} from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder, ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import {WorkerData} from "../../../Shared/WorkerData.interface";
import {DialogRef} from "@angular/cdk/dialog";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {UniversitiesService} from "./universities.service";
import {toSignal} from "@angular/core/rxjs-interop";
import {MaterialModule} from "../../material/material.module";
import {NgForOf, NgIf} from "@angular/common";

export interface WorkerFormInterface {
  firstName: FormControl<string>,
  lastName: FormControl<string>,
  university: FormControl<string>,
  companyName: FormControl<string>,
}


@Component({
  selector: 'app-worker-form',
  templateUrl: './worker-form.component.html',
  styleUrl: './worker-form.component.css',
  imports: [MaterialModule, ReactiveFormsModule, NgForOf, NgIf],
  standalone: true
})
export class WorkerFormComponent implements OnInit {// można rozbić na 2 komponenty POPUP i FORM
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly dialogRef = inject(MatDialogRef<WorkerFormComponent>);
  private readonly universitiesService = inject(UniversitiesService);
  universitiesObs$ = toSignal(this.universitiesService.getUniversities());

  @Input() data!: WorkerData;
  @Input() isEditable = true;
  workerForm: FormGroup<WorkerFormInterface> = this.fb.group({
    firstName: this.fb.control('', Validators.required),
    lastName: this.fb.control('', Validators.required),
    university: this.fb.control(''),
    companyName: this.fb.control({value: '', disabled: true}, Validators.required)
  });

  constructor(
    // @Inject(MAT_DIALOG_DATA) private data: WorkerDialogInterface
  ) {}

  ngOnInit(): void {
    console.log(this.data)
    if (this.data) {
      // można zrobić this.workerFOrm.patchValue()
      this.workerForm.controls.firstName.setValue(this.data.name)
      this.workerForm.controls.lastName.setValue(this.data.surname)
      if (this.data.companyName) {
        this.workerForm.controls.companyName.setValue(this.data.companyName)
      }
      if (this.data.university) {
        this.workerForm.controls.university.setValue(this.data.university)
      }
    }

    if (!this.isEditable) {
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
      _id: this.data._id,
      companyId: this.data.companyId,
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
