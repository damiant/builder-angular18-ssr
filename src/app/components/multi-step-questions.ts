import { Question } from "./multi-step.component";

export const exampleQuestions: Question[] =
// These are the default questions that are populated when dropping onto a page
 [
    {
      "title": "Hello! What can we help you with today?",
      "subtitle": "",
      "type": "buttons",
      "values": ["Buying a Home", "Getting Some Cash", "Lowing Payments"],
      "answer": ""
    },
    {
      "title": "What's your email?",
      "subtitle": "We are comitted to protecting your personal information.",
      "label": "Email Address",
      "type": "email",
      "placeholder": "eg myemail@gmail.com",
      "answer": ""
    },
    {
      "title": "What's your credit score?",
      "subtitle": "We use this to give you the best possible rates.",
      "label": "Credit Score",
      "type": "dropdown",
      "values": [
        "Excellent (740-850)",
        "Good (670-740)",
        "Fair (480-670)",
        "Poor (0 - 480)"
      ],
      "answer": ""
    }
  ]
  ;