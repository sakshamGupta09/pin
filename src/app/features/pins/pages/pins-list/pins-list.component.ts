import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { GlobalDataService } from '../../../../core/services/global-data.service';
import { DrawerComponent } from '../../../../shared/UI/drawer/drawer.component';

@Component({
  selector: 'app-pins-list',
  standalone: true,
  imports: [DrawerComponent],
  templateUrl: './pins-list.component.html',
  styleUrl: './pins-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PinsListComponent {
  private dataService = inject(GlobalDataService);

  private drawerContent = viewChild('drawerContent', {
    read: ViewContainerRef,
  });

  protected pins = this.dataService.getPins();

  protected showDrawer = signal(false);

  protected async addPinHandler() {
    const { AddPinComponent } = await import(
      '../../components/add-pin/add-pin.component'
    );
    this.drawerContent()?.createComponent(AddPinComponent);
  }

  protected async addCustomerHandler() {
    this.setDrawerVisibility(true);

    const { AddCustomerComponent } = await import(
      '../../../customers/components/add-customer/add-customer.component'
    );
    const component =
      this.drawerContent()?.createComponent(AddCustomerComponent);
  }

  protected destroyComponent(): void {
    this.drawerContent()?.clear();
  }

  public setDrawerVisibility(visibility: boolean): void {
    this.showDrawer.set(visibility);
  }

  public closeDrawer(): void {
    this.setDrawerVisibility(false);
    this.destroyComponent();
  }
}
