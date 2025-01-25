import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { register } from "@builder.io/sdk-angular";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    register("editor.settings", {
      designTokens: {
        colors: [
          { name: "Primary", value: "var(--ion-color-primary, #0e8ef5)" },
        ]
      }
    });
  }

}
