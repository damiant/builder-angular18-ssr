import type { RegisteredComponent } from "@builder.io/sdk-angular";
import { Counter } from "./components/counter.component";
import { GetStartedComponent } from "./components/get-started.component";

export const CUSTOM_COMPONENTS: RegisteredComponent[] = [
  {
    component: GetStartedComponent,
    name: "Get Started Form",
    meta: {
      selector: "app-get-started",
      standalone: true,
    },
    inputs: [
      {
        name: "Question1",
        type: "string",
      },
    ],
  },

  {
    component: Counter,
    name: "Counter",
    meta: {
      selector: "app-counter",
      standalone: true,
    },
    inputs: [
      {
        name: "initialCount",
        type: "number",
      },
    ],
  },
];
