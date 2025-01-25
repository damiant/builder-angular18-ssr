import { Component, Input } from "@angular/core";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: "app-get-started",
  standalone: true,
  templateUrl: './get-started.component.html',
  styleUrl: './get-started.component.scss',
  imports: [FormsModule, MatFormFieldModule, MatInputModule],
})
export class GetStartedComponent {
  @Input() initialCount: number = 99;
  count: number;

  constructor() {
    this.count = this.initialCount;
  }

  ngOnInit(): void {
    this.count = this.initialCount;
  }

  increment(): void {
    this.count += 1;
  }

  decrement(): void {
    this.count -= 1;
  }
}
