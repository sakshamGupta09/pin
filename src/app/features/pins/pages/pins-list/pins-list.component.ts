import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewContainerRef,
} from '@angular/core';
import { GlobalDataService } from '../../../../core/services/global-data.service';

@Component({
  selector: 'app-pins-list',
  standalone: true,
  imports: [],
  templateUrl: './pins-list.component.html',
  styleUrl: './pins-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PinsListComponent {
  private dataService = inject(GlobalDataService);

  private viewContainer = inject(ViewContainerRef);

  protected pins = this.dataService.getPins();

  protected async addPinHandler() {
    this.viewContainer.clear();

    const { AddPinComponent } = await import(
      '../../components/add-pin/add-pin.component'
    );
    this.viewContainer.createComponent(AddPinComponent);
  }

  protected async addCustomerHandler() {
    this.viewContainer.clear();

    const { AddCustomerComponent } = await import(
      '../../../customers/components/add-customer/add-customer.component'
    );
    this.viewContainer.createComponent(AddCustomerComponent);
  }
}
