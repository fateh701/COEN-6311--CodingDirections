import { Token, loadStripe, Stripe,StripeCardElementChangeEvent } from '@stripe/stripe-js';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../auth.service';
import {SharedService} from "../../shared.service";
import { AuthenticationService } from '../../authentication/authentication.service';
import {ActivatedRoute,Router} from "@angular/router";
@Component({
  selector: 'app-custom-bookings-payment',
  templateUrl: './custom-bookings-payment.component.html',
  styleUrls: ['./custom-bookings-payment.component.css']
})
export class CustomBookingsPaymentComponent implements OnInit {
  stripePromise: Promise<Stripe | null>;
  card: any;
  selectedBooking: any = {};
  stripe: any;

  constructor(private route: ActivatedRoute,private router:Router, private service: SharedService, private authenticationService: AuthenticationService, private authService: AuthService) {
    this.stripePromise = loadStripe('pk_test_51P27GmRvQV0xL8xGbiEwxcfJxjPSgRxkDama6SvtFUtzEQl82xYVxFeZ9Yv9olmoPYVdy0FxFesrw1ML92OwDv4f00CRCzoVoO');
    this.getSelectedBooking();
  }
  getUserID() {
    if (typeof localStorage === 'undefined' || localStorage === null || !localStorage.getItem('userData')!) {
    return;
    }
    //const userid: AuthResData = JSON.parse(localStorage.getItem('userData')!);
    const userInfo = JSON.parse(localStorage.getItem('userData')!);
    // @ts-ignore
    console.log("user id return while fetching user id for create booking:",userInfo.id);

    return userInfo.id;
  }
  getSelectedBooking = () => {
    //fetch and display the booking details
    const bookingId = this.route.snapshot.paramMap.get('id'); //packageid will be passed here from booking review component.ts
    this.service.getSelectedCustomTravelpackage(bookingId).subscribe(
      data => {
        this.selectedBooking = data;
        console.log("id:" + this.selectedBooking.id);
      },
      error => {
        console.log(error);
      },
    );
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

         const userToken = this.authService.getUserINFO()?.token;
      const userID = this.getUserID();
      //console.log("Userid from user info dict:", userID);
      if (userID === undefined || userID === null || userID === '' || userID === 0 || isNaN(userID)) {
        console.log("userID not found in local storage,trace the confirmBooking function from custom booking component");
      } else {
        console.log("Userid from user info dict:", userID);
        // @ts-ignore
        this.service.postConfirmCustomBooking(this.selectedBooking.id, userID).subscribe(
          response => {
            //Handle successful booking confirmation
            console.log("Booking confirmed")
            this.router.navigate(['/bookings']);
          },
          error => {
            console.log("Error confirming booking:", error);
          },
        )
      }
    }
  });
}}
