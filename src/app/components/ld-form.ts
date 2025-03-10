import { Component, ElementRef, inject, Input, Renderer2 } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { environment } from "~/environments/environment";

@Component({
  selector: "app-ld-form",
  templateUrl: "./ld-form.html",
  styleUrl: "./ld-form.scss",
  imports: [FormsModule],
  standalone: true,
})
export class LDForm {
  @Input() submitUrl: string = '';
  private scriptElement: HTMLScriptElement | null = null;
  private el: ElementRef | undefined;
  private renderer = inject(Renderer2);

  async ngOnInit(): Promise<void> {
    this.loadScript(
      `https://www.google.com/recaptcha/api.js?render=${environment.reCAPTCHASiteKey}`
    );
  }

  private loadScript(src: string) {
    this.scriptElement = this.renderer.createElement("script");
    if (this.scriptElement) {
      this.scriptElement.src = src;
      this.scriptElement.type = "text/javascript";

      this.renderer.appendChild(
        this.el?.nativeElement.querySelect("#myForm"),
        this.scriptElement
      );
    }
  }

  public onSubmit(form: any) {
    console.log(`Submit to ${this.submitUrl}`, form);
  }
}

