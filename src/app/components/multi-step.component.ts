import { Component, computed, Input, signal } from "@angular/core";
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldModule,
} from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { FormsModule } from "@angular/forms";

export interface Question {
  title: string;
  subtitle: string;
  type: "email" | "text" | "dropdown" | "buttons"; // The way to get the answer
  label?: string; // The label for the input control
  values?: string[]; // For dropdowns or buttons what options are shown
  answer: string | undefined; // The answer to the question
  placeholder?: string; // For inputs shows the placeholder text
}

@Component({
  selector: "app-multi-step",
  templateUrl: "./multi-step.component.html",
  styleUrl: "./multi-step.component.scss",
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: "outline" },
    },
  ],
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class MultiStepComponent {
  _questions: Question[] = [];
  get questions() {
    return this._questions;
  }
  @Input() set questions(value: Question[]) {
    this._questions = value;
    if (!value) {
      this._questions = [];
    }
  }

  done = signal(false);
  step = signal(0);
  isLast = computed(() => this.step() === this.questions?.length - 1);
  isFirst = computed(() => this.step() === 0);
  showContinue = computed(() => this.question().type !== "buttons");
  steps = computed(() => this.questions?.length);  
  question = computed(() => {
    if (!this.questions || this.step() >= this.questions.length)
      return {
        title: "",
        label: "",
        placeholder: "",
        subtitle: "",
        type: "text",
        values: [],
        answer: "",
      };
    return this.questions[this.step()];
  });

  private submit() {    
    const answers = this.questions.map((q) => q.answer);
    // We can submit answers to our backend
    alert(`Answers to submit: ${JSON.stringify(answers)}`);
  }

  next() {
    if (this.question()?.answer === "") {
      alert("You need to answer the question before continuing");
      return;
    }
    if (this.isLast()) {
      this.done.set(true);
      this.submit();      
      return;
    }
    this.step.set(this.step() + 1);
  }

  previous() {
    this.step.set(this.step() - 1);
  }

  selectAnswer(value: string) {
    if (!this.question()) return;
    this.question()!.answer = value;
    this.next();
  }
}
