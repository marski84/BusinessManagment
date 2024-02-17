import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, retry, tap} from "rxjs";
import {PanelService} from "../../panel/panel.service";

interface UniversityInterface {
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class WorkerFormService {
  private readonly http = inject(HttpClient);
  private readonly universityUrl = 'http://universities.hipolabs.com/search?country=Poland';

  getUniversities() {
    return this.http.get<UniversityInterface[]>(this.universityUrl)
      .pipe(
        retry(3),
        map(data => data.map(item => item.name)),
        map(data => {
          data.push('')
          return data
        }),
      );
  }


  constructor() {
    console.log('worker service created')
  }
}
