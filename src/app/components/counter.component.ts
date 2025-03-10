import { Component, Input } from "@angular/core";
import { getTranslations } from "../translations";

@Component({
  selector: "app-counter",
  standalone: true,
  template: `
    <div class="counter">
      <button class="btn" (click)="decrement()">-</button>
      <span class="count">{{ count }}</span>
      <button class="btn" (click)="increment()">+</button>
    </div>
  `,
  styles: [
    `
      .counter {
        margin: 32px auto;
        display: flex;
        width: 100%;
        max-width: 190px;
      }

      .btn {
        width: 42px;
        font-size: 32px;
        font-weight: bold;
        background-color: #1c6bd1;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        line-height: 1.4;
      }

      .btn:hover {
        opacity: 0.8;
      }

      .count {
        flex: 1;
        font-size: 42px;
        text-align: center;
        margin: 0 8px;
      }
    `,
  ],
})
export class Counter {
  @Input() initialCount: number = 99;
  count: number;

  constructor() {
    this.count = this.initialCount;
  }

  async ngOnInit(): Promise<void> {
    this.count = this.initialCount;
    
      const obj = await getTranslations("promo", GetPromoData());
   
  }

  increment(): void {
    this.count += 1;
  }

  decrement(): void {
    this.count -= 1;
  }
}

function GetPromoData() {
  return {
    promo_applied_header: "PROMO CODE {0} HAS BEEN APPLIED.",
    promo_expired_header: "PROMO CODE {0} HAS EXPIRED.",
    promo_expired_body:
      "You may apply another promo code when choosing your plan.",
    use_code_text: "When choosing your plan use promo code:",
    promo_footer:
      "You will see your incentives applied when you choose your plan.",
  };
}
