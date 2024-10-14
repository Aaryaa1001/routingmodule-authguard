import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private toastrService: ToastrService) { }

  public showSuccess(msg:any) {
    this.toastrService.success(msg);
  }

  public showInfo(msg:any) {
    this.toastrService.info(msg);
  }

  public showWarning(msg:any) {
    this.toastrService.warning(msg);
  }

  public showError(msg:any) {
    this.toastrService.error(msg);
  }
}
