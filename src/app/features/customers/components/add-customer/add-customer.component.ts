import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-add-customer',
  standalone: true,
  imports: [],
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCustomerComponent {}
