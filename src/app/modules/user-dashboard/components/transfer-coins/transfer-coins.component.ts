import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '@shared/services/auth/auth.service';
import {Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-transfer-coins',
  templateUrl: './transfer-coins.component.html',
  styleUrls: ['./transfer-coins.component.scss']
})
export class TransferCoinsComponent implements OnInit, OnDestroy {

  public transferCoinsForm: FormGroup;
  public balance: number;

  private balanceSubscription: Subscription;

  constructor(
      public authService: AuthService,
      private formBuilder: FormBuilder,
      private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.transferCoinsForm = this.formBuilder.group({
       'amountToTransfer': ['', [Validators.required, Validators.min(1)]],
       'transferTo': ['', [Validators.required, Validators.email]]
    });
    this.balanceSubscription = this.authService.user$.pipe(
      map(user => user.amount)
    ).subscribe(balance => this.balance = balance);
  }

  public sendCoinsSubmit() {
    if (this.transferCoinsForm.invalid) {
      if (this.transferCoinsForm.controls.amountToTransfer.errors) {
          if (this.transferCoinsForm.controls.amountToTransfer.errors.required) {
              this.toastrService.error('Amount is required!', 'Invalid Amount');
          } else if (this.transferCoinsForm.controls.amountToTransfer.errors.min) {
              this.toastrService.error('Amount is below 1!', 'Invalid Amount');
          }
      } else if (this.transferCoinsForm.controls.transferTo.errors) {
        if (this.transferCoinsForm.controls.transferTo.errors.required) {
            this.toastrService.error('Receiver email is required!', 'Invalid Receiver');
        } else if (this.transferCoinsForm.controls.transferTo.errors.email) {
            this.toastrService.error('Receiver email is not a valid e-mail address!', 'Invalid Receiver');
        }
      }
      return;
    } else if (this.transferCoinsForm.controls.amountToTransfer.value > this.balance) {
        this.toastrService.error('Amount is higher than your current balance!', 'Invalid Amount');
        return;
    }


    const amountToTransfer = this.transferCoinsForm.controls.amountToTransfer.value;
    const transferTo = this.transferCoinsForm.controls.transferTo.value;

    this.authService.transferCoins(amountToTransfer, transferTo)
        .then(() => this.toastrService.success(`Transfered ${amountToTransfer} coins to ${transferTo}`, 'Nice!'))
        .catch(error => {
            if (error.message === 'noUser') {
                this.toastrService.error('Receiver email does not exist!', 'Invalid Receiver');
            } else if (error.message === 'ownUser') {
                this.toastrService.error('You can not transfer coins to your own account!', 'Invalid Receiver');
            }
        });

  }

  ngOnDestroy() {
    this.balanceSubscription.unsubscribe();
  }

}
