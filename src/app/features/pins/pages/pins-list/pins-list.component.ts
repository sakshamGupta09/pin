import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-pins-list',
  standalone: true,
  imports: [],
  templateUrl: './pins-list.component.html',
  styleUrl: './pins-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PinsListComponent {

}
