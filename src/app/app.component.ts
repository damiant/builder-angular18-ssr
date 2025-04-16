import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { register } from "@builder.io/sdk-angular";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, FormsModule],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    register("editor.settings", {
      styleStrictMode: true, // optional
      designTokens: {
        colors: [
          { name: "Brand Red", value: "var(--red, #ff0000)" },
          { name: "Brand Blue", value: "rgba(93, 150, 255, 1)" },
        ],
        spacing: [
          { name: "Large", value: "var(--space-large, 20px)" },
          { name: "Small", value: "var(--space-small, 10px)" },
          { name: "Tiny", value: "5px" },
        ],
        fontFamily: [
          { name: "Serif Font", value: "var(--serif-font, Times, serif)" },
          { name: "Primary Font", value: "Roboto, sans-serif" },
        ],
      }
    });
  }
}
