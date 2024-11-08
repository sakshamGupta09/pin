import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
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
import { DrawerContentComponent } from '../../../../shared/UI/drawer-content/drawer-content.component';
import { ICustomer } from '../../../../core/models/customer';
import { LocationService } from '../../../../shared/services/location.service';
import { RegionWiseCountries } from '../../../../core/models/locations';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'app-add-customer',
  standalone: true,
  imports: [DrawerContentComponent, ReactiveFormsModule, NgSelectComponent],
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCustomerComponent implements OnInit {
  private fb = inject(NonNullableFormBuilder);

  private dataService = inject(GlobalDataService);

  private locationService = inject(LocationService);

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
    region: [null, [Validators.required]],
    country: [null, [Validators.required]],
  });

  protected regions = signal<string[]>([]);

  protected countries = signal<RegionWiseCountries>({});

  public onDrawerClose = output();

  ngOnInit(): void {
    this.getLocations();
  }

  private getLocations(): void {
    this.locationService.getLocations().subscribe({
      next: (response) => {
        const regions: string[] = [];
        const countries: RegionWiseCountries = {};

        for (let key in response.data) {
          const { region, country } = response.data[key];
          if (!countries[region]) {
            countries[region] = [];
            regions.push(region);
          }
          countries[region].push(country);
        }
        this.regions.set(regions);
        this.countries.set(countries);
      },
    });
  }

  private emailExistsValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    const customers = this.dataService.getCustomers()();

    for (let i = 0; i < customers.length; i++) {
      if (customers[i].email.trim() === control.value.trim()) {
        return { emailExists: true };
      }
    }
    return null;
  }

  protected submitClickHandler(): void {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }
    const request = this.getRequest();
    this.dataService.addCustomer(request);
    this.onDrawerClose.emit();
  }

  private getRequest(): ICustomer {
    return {
      name: this.name.value.trim(),
      email: this.email.value.trim(),
      region: this.region.value,
      country: this.country.value,
    };
  }

  protected regionChangeHandler(): void {
    this.country.setValue(null);
  }

  protected get name() {
    return this.form.get('name') as AbstractControl;
  }

  protected get email() {
    return this.form.get('email') as AbstractControl;
  }

  protected get region() {
    return this.form.get('region') as AbstractControl;
  }

  protected get country() {
    return this.form.get('country') as AbstractControl;
  }
}
