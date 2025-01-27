import { Component, Input } from "@angular/core";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { states } from "./us-states";
import { creditScores } from "./credit-scores";

interface Form {
  propertyValue: number | string;
  loanAmount: number | string;
  state: string;
  creditScore: number | string;
}

@Component({
  selector: "app-get-started",
  standalone: true,
  templateUrl: './get-started.component.html',
  styleUrl: './get-started.component.scss',
  providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }],
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
})
export class GetStartedComponent {
  @Input() question1: string = 'What is your name?';

  states = states;
  creditscores = creditScores;

  form: Form = {
    propertyValue: '',
    loanAmount: '',
    state: "",
    creditScore: ''
  };

  submit() {
    // Add your validation logic
    if (this.form.state.length != 2) {
      alert("Please select a state");
      return;
    }
  }

}
