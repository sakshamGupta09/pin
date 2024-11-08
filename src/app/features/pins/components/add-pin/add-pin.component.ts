import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
} from '@angular/core';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { GlobalDataService } from '../../../../core/services/global-data.service';
import { DrawerContentComponent } from '../../../../shared/UI/drawer-content/drawer-content.component';
import { NgSelectComponent } from '@ng-select/ng-select';
import { IPin } from '../../../../core/models/pin';
import { PRIVACY_TYPES } from '../../../../constants/privacy-types';
import { FileItem, FileUploader, FileUploadModule } from 'ng2-file-upload';

@Component({
  selector: 'app-add-pin',
  standalone: true,
  imports: [
    DrawerContentComponent,
    ReactiveFormsModule,
    NgSelectComponent,
    FileUploadModule,
  ],
  templateUrl: './add-pin.component.html',
  styleUrl: './add-pin.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddPinComponent {
  private fb = inject(NonNullableFormBuilder);

  private dataService = inject(GlobalDataService);

  protected form = this.fb.group({
    title: [null, [Validators.required]],
    image: [null, [Validators.required]],
    customers: [null, [Validators.required]],
    privacy: [null, [Validators.required]],
  });

  protected customerList = this.dataService.getCustomers();

  public onDrawerClose = output();

  readonly privacyTypes = PRIVACY_TYPES;

  protected uploader: FileUploader = new FileUploader({
    url: '',
    allowedFileType: ['image'],
    autoUpload: false,
  });

  protected imageDetails = {
    name: '',
    url: '',
  };

  constructor() {
    this.uploader.onAfterAddingFile = this.afterFileAdded.bind(this);
  }

  private afterFileAdded(fileItem: FileItem): void {
    const file: File = fileItem._file;
    this.image.setValue(file.name);

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageDetails = {
        name: file.name,
        url: e.target.result,
      };
    };
    reader.readAsDataURL(file);
  }

  protected submitClickHandler(): void {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }
    const request = this.getRequest();
    this.dataService.addPin(request);
    this.onDrawerClose.emit();
  }

  private getRequest(): IPin {
    return {
      title: this.title.value.trim(),
      image: this.imageDetails.url,
      customers: this.customers.value,
      privacy: this.privacy.value,
    };
  }

  protected get title() {
    return this.form.get('title') as AbstractControl;
  }

  protected get image() {
    return this.form.get('image') as AbstractControl;
  }

  protected get customers() {
    return this.form.get('customers') as AbstractControl;
  }

  protected get privacy() {
    return this.form.get('privacy') as AbstractControl;
  }
}
