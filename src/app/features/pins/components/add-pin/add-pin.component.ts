import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-add-pin',
  standalone: true,
  imports: [],
  templateUrl: './add-pin.component.html',
  styleUrl: './add-pin.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddPinComponent {}
