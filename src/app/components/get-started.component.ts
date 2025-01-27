import { Component, inject, Input, OnInit } from "@angular/core";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { states } from "./us-states";
import { creditScores } from "./credit-scores";
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module, ReCaptchaV3Service } from "ng-recaptcha-2";
import { environment } from "~/environments/environment";
import { Subscription } from "rxjs";

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
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
    { provide: RECAPTCHA_V3_SITE_KEY, useValue: environment.reCAPTCHASiteKey },
    ReCaptchaV3Service
  ],
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, RecaptchaV3Module],
})
export class GetStartedComponent implements OnInit {
  private scriptElement: HTMLScriptElement | null = null;
  private recaptchaV3Service = inject(ReCaptchaV3Service);
  private recaptchaSubscription: Subscription | undefined;
  @Input() question1: string = 'What is your name?';

  states = states;
  creditscores = creditScores;

  ngOnInit() {
    //this.loadScript('https://www.google.com/recaptcha/api.js');

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

  handleToken(token: any) {
    console.log('Handle token', token);
  }
  onSubmit(data: any) {
    // Add your validation logic
    if (this.form.state.length != 2) {
      alert("Please select a state");
      return;
    }
    if (this.recaptchaSubscription) {
      this.recaptchaSubscription.unsubscribe();
    }
    this.recaptchaSubscription = this.recaptchaV3Service.execute('importantAction')
      .subscribe((token) => this.handleToken(token));
    console.log(this.form);

  }

}
