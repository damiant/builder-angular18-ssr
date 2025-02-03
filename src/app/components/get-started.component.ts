import { Component, ElementRef, inject, Input, OnInit, Renderer2 } from "@angular/core";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { states } from "./us-states";
import { creditScores } from "./credit-scores";
import { environment } from "~/environments/environment";
declare var grecaptcha : any;


interface Form {
  propertyValue: number | string;
  loanAmount: number | string;
  state: string;
  creditScore: number | string;
  reCAPTCHAToken: string;
}

@Component({
    selector: "app-get-started",
    templateUrl: './get-started.component.html',
    styleUrl: './get-started.component.scss',
    providers: [
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }
    ],
    imports: [FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule]
})
export class GetStartedComponent implements OnInit {
  private scriptElement: HTMLScriptElement | null = null;
  private renderer = inject(Renderer2);
  private el: ElementRef | undefined;
  @Input() question1: string = 'What is your name?';

  states = states;
  creditscores = creditScores;

  ngOnInit() {
    //this.loadScript(`https://www.google.com/recaptcha/api.js?render=${environment.reCAPTCHASiteKey}`);
  }

  form: Form = {
    propertyValue: '',
    loanAmount: '',
    state: "",
    creditScore: '',
    reCAPTCHAToken: ''
  };

  private loadScript(src: string) {
    this.scriptElement = this.renderer.createElement('script');
    if (this.scriptElement) {
    this.scriptElement.src = src;
    this.scriptElement.type = 'text/javascript';
    
    this.renderer.appendChild(this.el?.nativeElement.querySelect('#myForm'),this.scriptElement);
    }
  }

  async onSubmit(data: any) {
    // Add your validation logic
    if (this.form.state.length != 2) {
      alert("Please select a state");
      return;
    }
    const token: string = await grecaptcha.execute(environment.reCAPTCHASiteKey, { action: "login" });
    this.form.reCAPTCHAToken = token;
    console.log(`Submit this to the backend`,this.form);

  }

}
