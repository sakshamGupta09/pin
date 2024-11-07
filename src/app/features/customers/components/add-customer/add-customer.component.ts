import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
  signal,
} from '@angular/core';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { GlobalDataService } from '../../../../core/services/global-data.service';
import { DrawerComponent } from '../../../../shared/UI/drawer/drawer.component';

@Component({
  selector: 'app-add-customer',
  standalone: true,
  imports: [DrawerComponent, ReactiveFormsModule],
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCustomerComponent {
  private fb = inject(NonNullableFormBuilder);

  private dataService = inject(GlobalDataService);

  protected form = this.fb.group({
    name: ['', [Validators.required]],
    email: [
      '',
      [
        Validators.required,
        Validators.email,
        this.emailExistsValidator.bind(this),
      ],
    ],
    region: ['', [Validators.required]],
    country: ['', [Validators.required]],
  });

  protected showDrawer = signal(true);

  public cancelClick = output();

  protected closeClickHandler(): void {
    this.showDrawer.set(false);
    this.cancelClick.emit();
  }

  private emailExistsValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    const customers = this.dataService.getCustomers()();

    for (let i = 0; i < customers.length; i++) {
      if (customers[i].email.trim() === control.value.trim()) {
        return { emailExists: true };
      }
    }
    return null;
  }
}
