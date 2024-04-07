import { Token, loadStripe, Stripe,StripeCardElementChangeEvent } from '@stripe/stripe-js';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-bookings-payment',
  templateUrl: './bookings-payment.component.html',
  styleUrls: ['./bookings-payment.component.css']
})
export class BookingsPaymentComponent implements OnInit {
  stripePromise: Promise<Stripe | null>;
  card: any;
  stripe: any;

  constructor() {
    this.stripePromise = loadStripe('pk_test_51P27GmRvQV0xL8xGbiEwxcfJxjPSgRxkDama6SvtFUtzEQl82xYVxFeZ9Yv9olmoPYVdy0FxFesrw1ML92OwDv4f00CRCzoVoO');
  }

  ngOnInit(): void {
    this.stripePromise.then(stripe => {
      if (stripe) {
        this.stripe = stripe;
        const elements = stripe.elements();
        const style = {
          base: {
            color: '#32325d',
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            '::placeholder': {
              color: '#aab7c4'
            }
          },
          invalid: {
            color: '#fa755a',
            iconColor: '#fa755a'
          }
        };
        // Create an instance of the card Element.
        this.card = elements.create('card', { style: style });
        // Add an instance of the card Element into the `card-element` <div>.
        this.card.mount('#cardElement');
        this.card.on('change', (event: StripeCardElementChangeEvent) => {
          const displayError = document.getElementById('card-errors');
          if (event?.error) {
            if (displayError) {
              displayError.textContent = event.error.message;
            }
          } else {
            if (displayError) {
              displayError.textContent = '';
            }
          }
        });
        // Create a token when the form is submitted.
        var form = document.getElementById('payment-form');
        form?.addEventListener('submit',(event)=>{
          event.preventDefault();
          this.createToken();
        });
      }
    });
  }

  createToken() {
    this.stripe.createToken(this.card).then((result: { token?: Token; error?: any })=>{
      if (result.error) {
        // Inform the user if there was an error
        var errorElement = document.getElementById('card-errors');
        errorElement!.textContent = result.error.message;
      } else {
        // Send the token to your server
//         stripeTokenHandler(result.token);
      }
    });
  }
}
