import { Component } from "@angular/core";
import {
  FormControl,
  FormGroupDirective,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { ErrorStateMatcher } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MaskitoDirective } from "@maskito/angular";
import { MaskitoOptions } from "@maskito/core";
import { phoneMask, validPhone } from "./phone-number-mask";
import { Maskito } from "@maskito/core";

// See for example: https://material.angular.io/components/input/overview
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: "app-phone-number",
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    MaskitoDirective,
  ],
  templateUrl: "./phone-number.component.html",
  styleUrl: "./phone-number.component.scss",
})
export class PhoneNumberComponent {
  phoneFormControl = new FormControl("", [
    Validators.required,
    // ChatGPT is useful for this: provide a regex useful for a us phone number with the format +1 (000) 000-0000 that works for javascript
    Validators.pattern(/^\+1 \(\d{3}\) \d{3}-\d{4}$/),
  ]);
  matcher = new MyErrorStateMatcher();
  placeholder = "eg (000) 0000-0000";
  value = "";
  name = "phone";
  label = "Phone Number";
  maskitoOptions: MaskitoOptions = phoneMask;

  onChange(event: any) {
    this.value = event.target.value;
    window.postMessage({
      name: this.name,
      value: this.value,
      valid: validPhone(this.value),
    });
  }
}
