import { DOCUMENT } from "@angular/common";
import {
  Component,
  ElementRef,
  Inject,
  inject,
  Input,
  Renderer2,
  ViewChild,
} from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { environment } from "~/environments/environment";

@Component({
  selector: "app-ld-form",
  templateUrl: "./ld-form.html",
  styleUrl: "./ld-form.scss",
  imports: [FormsModule],
  standalone: true,
})
export class LDForm {
  @Input() submitUrl: string = "";
  private scriptElement: HTMLScriptElement | null = null;
  @ViewChild("myForm") myForm!: NgForm;
  private el: ElementRef | undefined;
  private renderer = inject(Renderer2);
  private document = inject(DOCUMENT);
  private formData: any = {};
  private invalid: string[] = [];

  async ngOnInit(): Promise<void> {
    this.loadScript(
      `https://www.google.com/recaptcha/api.js?render=${environment.reCAPTCHASiteKey}`
    );
    window.addEventListener("message", (event) => {
      const name = event.data.name as string;
      if (!name) return;
      console.log(`${name}=${event.data.value} valid=${event.data.valid}`);
      this.formData[name] = event.data.valid ? event.data.value : undefined;
      if (!event.data.valid && !this.invalid.includes(name)) {
        this.invalid.push(name);
      } else if (event.data.valid && this.invalid.includes(name)) {
        this.invalid = this.invalid.filter((i) => i !== name);
      }
    });
  }

  private loadScript(src: string) {
    const scriptElement = this.renderer.createElement("script");
    if (!scriptElement) return;
    scriptElement.src = src;
    scriptElement.type = "text/javascript";
    this.renderer.appendChild(this.document.head, scriptElement);
  }

  public onSubmit(form: any) {
    if (this.invalid.length > 0) {
      alert("There are fields with errors: "+this.invalid.join(", "));
      return;
    }
    console.log(`Submit to ${this.submitUrl}`, this.formData);
    alert(`Submitting ${JSON.stringify(this.formData)}`);
  }
}
