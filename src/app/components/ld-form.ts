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

  async ngOnInit(): Promise<void> {
    this.loadScript(
      `https://www.google.com/recaptcha/api.js?render=${environment.reCAPTCHASiteKey}`
    );
  }

  private loadScript(src: string) {
    const scriptElement = this.renderer.createElement("script");
    if (!scriptElement) return;
    scriptElement.src = src;
    scriptElement.type = "text/javascript";
    this.renderer.appendChild(this.document.head, scriptElement);
  }

  public onSubmit(form: any) {
    console.log(`Submit to ${this.submitUrl}`, form);
  }
}
