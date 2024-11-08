import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slideInOut', [
      state('open', style({ transform: 'translateX(0)' })),
      state('closed', style({ transform: 'translateX(100%)' })),
      transition('open <=> closed', [animate('0.3s ease')]),
    ]),
  ],
})
export class DrawerComponent {
  public isVisible = input.required<boolean>();

  public onClose = output();

  protected closeClickHandler(): void {
    this.onClose.emit();
  }
}
