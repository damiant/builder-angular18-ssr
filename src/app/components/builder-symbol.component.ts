import { Component, Input } from "@angular/core";
import { fetchOneEntry, type BuilderContent } from "@builder.io/sdk-angular";
import { Content } from "@builder.io/sdk-angular";
import { CommonModule } from "@angular/common";
import { environment } from "../../environments/environment";
import { CUSTOM_COMPONENTS } from "../builder-registry";

@Component({
  selector: "app-symbol",
  standalone: true,
  imports: [Content, CommonModule],
  template: `
    <builder-content
      [model]="model"
      [content]="content"
      [apiKey]="apiKey"
      [customComponents]="customComponents"
    ></builder-content>
  `,
})
export class BuilderSymbol {
  model = "symbol";

  apiKey = environment.builderApiKey;

  content: BuilderContent | null = null;

  customComponents = CUSTOM_COMPONENTS;

  async ngOnInit() {
    const urlPath = window.location.pathname || "/";
    console.log(`Symbol urlPath=${urlPath}`);

    const builderContent = await fetchOneEntry({
      model: this.model,
      apiKey: this.apiKey,
      userAttributes: {
        urlPath,
      },
    });

    if (!builderContent) {
      return;
    }

    this.content = builderContent;
  }
}
