import { Component, inject, Input } from "@angular/core";
import {
  fetchOneEntry,
  type BuilderContent,
  isPreviewing,
} from "@builder.io/sdk-angular";
import { Content } from "@builder.io/sdk-angular";
import { CommonModule, Location } from "@angular/common";
import { environment } from "../../environments/environment";
import { CUSTOM_COMPONENTS } from "../builder-registry";
import { getTranslations } from "../translations";

@Component({
  selector: "app-builder-page",
  imports: [Content, CommonModule],
  template: `
    <ng-container *ngIf="content || isPreviewing; else notFound">
      <builder-content
        [model]="model"
        [content]="content"
        [apiKey]="apiKey"
        [customComponents]="customComponents"
      ></builder-content>
    </ng-container>

    <ng-template #notFound>
      <!-- <div>404 - Content not found</div> -->
    </ng-template>
  `,
})
export class BuilderPage {
  isPreviewing = isPreviewing();

  model = "page";
  //@Input() model = 'page';

  apiKey = environment.builderApiKey;

  content: BuilderContent | null = null;

  customComponents = CUSTOM_COMPONENTS;

  location = inject(Location);

  async ngOnInit() {
    const urlPath = this.location.path() || "/";
    console.log('BuilderPage Init', this.model)
    //const urlPath = window.location.pathname || "/";
    //console.log(`BuilderPage ngOnInit urlPath=${urlPath} model=${this.model}`);

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
