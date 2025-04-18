import type { RegisteredComponent } from "@builder.io/sdk-angular";
import { Counter } from "./components/counter.component";
import { GetStartedComponent } from "./components/get-started.component";
import { MultiStepComponent } from "./components/multi-step.component";
import { exampleQuestions } from "./components/multi-step-questions";
import { LDForm } from "./components/ld-form";
import { PhoneNumberComponent } from "./phone-number/phone-number.component";

export const CUSTOM_COMPONENTS: RegisteredComponent[] = [
  // Multi Step Component
  {
    component: MultiStepComponent,
    name: "Multi Step Form",
    meta: {
      selector: "app-multi-step",
      standalone: true,
    },
    inputs: [
      {
        friendlyName: "Questions",
        name: "questions",
        helperText: `Tip: type can be "email", "text", "dropdown", "buttons". Refresh after changing.`,
        type: "json",
        defaultValue: exampleQuestions,
      },
    ],
  },

  {
    component: LDForm,
    name: "LD Form",
    meta: {
      selector: "app-ld-form",
      standalone: true,
    },
    canHaveChildren: true,
    inputs: [{ name: "submitUrl", type: "string" }],
  },

  // Get Started Component
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

  // Phone Number Component
  {
    component: PhoneNumberComponent,
    name: "Phone Number",
    meta: {
      selector: "app-phone-number",
      standalone: true,
    },
    inputs: [
      {
        name: "placeholder",
        type: "string",
      },
      {
        name: "value",
        type: "string",
      },
      {
        name: "label",
        type: "string",
        defaultValue: "Phone Number",
      },
    ],
  },  

  // Counter Component
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
