# Builder Angular Gen 2 SSR

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.2.

[Builder](https://www.builder.io/c/docs/devtools) added for Angular Gen 2.
[Material Components](https://material.angular.io/guide/getting-started) added.

You can find this example deployed to [builder-angular-ssr.netlify.app](https://builder-angular-ssr.netlify.app/).

## Multistep Custom Component

As an example of a builder custom component that has inputs take a look at the [MultiStepComponent](src/app/components/multi-step.component.ts). It asks questions and the idea is to allow a content editor to define any questions they may have.

It is [registered with Builder](src/app/builder-registry.ts) with some [example questions](src/app/components/multi-step-questions.ts).

Here is the component registration showing `inputs` ([docs](https://www.builder.io/c/docs/custom-components-input-types#input-types)):
```
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
  }
```

Here's a [video of what this looks like](https://www.loom.com/share/d8699158f41a4654a5a4a50d4791ff11?sid=69b877f4-279f-444b-b540-c063a6dc668a) and an expanation of the code.

## ReCAPTCHA
Google ReCAPTCHA is integrated into the Getting Started form found in [get-started.component.ts](./src/app/components/get-started.component.ts).

How to integrate:
First run `npm install @types/grecaptcha`

In your code:
```typescript
declare var grecaptcha : any;
...
this.loadScript(`https://www.google.com/recaptcha/api.js?render=${environment.reCAPTCHASiteKey}`);

  private loadScript(src: string) {
    this.scriptElement = document.createElement('script');
    this.scriptElement.src = src;
    this.scriptElement.type = 'text/javascript';
    document.body.appendChild(this.scriptElement);
  }
```

Then before you submit data to the server:
```typescript
const token: string = await grecaptcha.execute(environment.reCAPTCHASiteKey, { action: "login" });
```
Make sure to pass the token to your backend and use your Google Private Key to validate this token.

## Builder Form: Get Started

The ["Get Started" form](./src/app/components/get-started.component.html) is registered with Builder in [builder-register.ts](./src/app/builder-registry.ts).


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## OpenWeather API Response

See [sample-data.json](./sample-data.json)

