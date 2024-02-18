import {Directive, HostListener, inject, Input} from '@angular/core';
import {PanelService} from "../panel/panel.service";

@Directive({
  selector: '[appDeleteWorker]',
})
export class DeleteWorkerDirective {
  @Input()
  workerId!: string

  private readonly panelService = inject(PanelService);

  constructor() { }

  @HostListener('click') handleClick() {
    if (!this.workerId) {
      return
    }
    this.panelService.deleteWorker(this.workerId)
  }

}
