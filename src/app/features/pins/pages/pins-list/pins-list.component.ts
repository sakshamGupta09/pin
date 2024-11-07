import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DrawerComponent } from '../../../../shared/UI/drawer/drawer.component';
import { AddCustomerComponent } from '../../../customers/components/add-customer/add-customer.component';
import { AddPinComponent } from '../../components/add-pin/add-pin.component';
import { GlobalDataService } from '../../../../core/services/global-data.service';

@Component({
  selector: 'app-pins-list',
  standalone: true,
  imports: [DrawerComponent, AddCustomerComponent, AddPinComponent],
  templateUrl: './pins-list.component.html',
  styleUrl: './pins-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PinsListComponent {
  private dataService = inject(GlobalDataService);

  protected pins = this.dataService.getPins();
}
