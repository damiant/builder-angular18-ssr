import { Component, Input, OnInit } from "@angular/core";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { states } from "./us-states";
import { creditScores } from "./credit-scores";
import { environment } from "~/environments/environment";

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
export class GetStartedComponent implements OnInit {
  private scriptElement: HTMLScriptElement | null = null;
  @Input() question1: string = 'What is your name?';

  states = states;
  creditscores = creditScores;

  ngOnInit() {
    this.loadScript('https://www.google.com/recaptcha/api.js');
  }
  form: Form = {
    propertyValue: '',
    loanAmount: '',
    state: "",
    creditScore: ''
  };

  private loadScript(src: string) {
    this.scriptElement = document.createElement('script');
    this.scriptElement.src = src;
    this.scriptElement.type = 'text/javascript';
    document.body.appendChild(this.scriptElement);
  }

  onSubmit(token: any) {
    console.log(token);
    console.log(this.form);
    // Add your validation logic
    if (this.form.state.length != 2) {
      alert("Please select a state");
      return;
    }
  }

}
