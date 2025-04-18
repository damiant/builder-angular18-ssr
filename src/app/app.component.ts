import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { registerDesignTokens } from "./builder-design-tokens";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, FormsModule],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    const designTokens = true;
    if (designTokens) {
      registerDesignTokens();
    }
  }
}
