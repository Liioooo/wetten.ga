import { Injectable } from '@angular/core';
import {IndividualConfig, IndividualToastrConfig, ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private config: Partial<IndividualConfig> = {
    closeButton: true
  };

  constructor(private toastr: ToastrService) { }

  public showSuccess(msg: string, title: string): void {
    this.toastr.success(msg, title, this.config);
  }

  public showError(msg: string, title: string): void {
    this.toastr.error(msg, title, this.config);
  }

  public showInfo(msg: string, title: string): void {
    this.toastr.info(msg, title, this.config);
  }

  public showWarning(msg: string, title: string): void {
    this.toastr.warning(msg, title, this.config);
  }
}
