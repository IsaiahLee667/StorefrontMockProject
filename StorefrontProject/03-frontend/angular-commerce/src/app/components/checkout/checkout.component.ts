import { registerLocaleData } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { Country } from 'src/app/common/country';
import { OrderItem } from 'src/app/common/order-item';
import { Orders } from 'src/app/common/orders';
import { Purchase } from 'src/app/common/purchase';
import { State } from 'src/app/common/state';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { Luv2ShopFormService } from 'src/app/services/luv2-shop-form.service';
import { Shopvalidators } from 'src/app/validators/shopvalidators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
 
  checkoutFormGroup: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;

  //Creditcard stuff
  creditCardYears: number [] = [];
  creditCardMonths: number [] = [];

  //Country and State Stuff
  countries: Country[] = [];

  //Shipping/BillingAddress
  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];
 
  constructor(private formBuilder: FormBuilder, private luv2ShopFormService : Luv2ShopFormService
    , private cartService: CartService
    , private checkoutService: CheckoutService
    , private router:Router) { }
 
  ngOnInit(): void {

    this.reviewCartDetails();


 
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl ('' , [Validators.required, Validators.minLength(2), Shopvalidators.notOnlyWhiteSpace]),
        lastName: new FormControl ('' , [Validators.required, Validators.minLength(2), Shopvalidators.notOnlyWhiteSpace]),
        email: new FormControl ('' , 
        [Validators.required
          ,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]
        ),
      }),
 
      shippingAddress: this.formBuilder.group({
        street: new FormControl('', [Validators.required, Validators.minLength(2), 
                                     Shopvalidators.notOnlyWhiteSpace]),
        city: new FormControl('', [Validators.required, Validators.minLength(2), 
                                   Shopvalidators.notOnlyWhiteSpace]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [Validators.required, Validators.minLength(2), 
                                      Shopvalidators.notOnlyWhiteSpace])
      }),
      billingAddress: this.formBuilder.group({
        street: new FormControl('', [Validators.required, Validators.minLength(2), 
                                     Shopvalidators.notOnlyWhiteSpace]),
        city: new FormControl('', [Validators.required, Validators.minLength(2), 
                                   Shopvalidators.notOnlyWhiteSpace]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [Validators.required, Validators.minLength(2), 
                                      Shopvalidators.notOnlyWhiteSpace])
      }),
      creditCard: this.formBuilder.group({
        cardType: new FormControl('', [Validators.required]),
        nameOnCard:  new FormControl('', [Validators.required, Validators.minLength(2), 
                                          Shopvalidators.notOnlyWhiteSpace]),
        cardNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{16}')]),
        securityCode: new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}')]),
        expirationMonth: [''],
        expirationYear: ['']
      })
 
    });

    //Credit card stuff after the formbuildr for the checkout form
    //Months
    const StartMonth: number = new Date().getMonth() + 1;
    console.log(StartMonth);
    this.luv2ShopFormService.getCreditCardMonths(StartMonth).subscribe(
      data =>{
        console.log("Current grabbed months are:" + JSON.stringify(data))
        this.creditCardMonths = data;
      }
    )

    
    //Years
  
    this.luv2ShopFormService.getCreditCardYears().subscribe(
      data =>{
        console.log("Current grabbed months are:" + JSON.stringify(data))
        this.creditCardYears = data;
      }
    )

    //After fetching credit card data, populate countries
    this.luv2ShopFormService.getCountries().subscribe(
      data => {
        console.log("Retrieved countries: " + JSON.stringify(data));
        this.countries = data;
      }
    );
  }
  reviewCartDetails() {
   //goal: Subscribe to cart service totalquantity and totalprice

   this.cartService.totalQuantity.subscribe(
    totalQuantity => this.totalQuantity = totalQuantity
  )

  this.cartService.totalPrice.subscribe(
    totalPrice => this.totalPrice = totalPrice
  )
  }
 
  get firstName(){
    return this.checkoutFormGroup.get('customer.firstName');
  }
  get lastName(){
    return this.checkoutFormGroup.get('customer.lastName');
  }
  get email(){
    return this.checkoutFormGroup.get('customer.email');
  }

  get shippingAddressStreet() { return this.checkoutFormGroup.get('shippingAddress.street'); }
  get shippingAddressCity() { return this.checkoutFormGroup.get('shippingAddress.city'); }
  get shippingAddressState() { return this.checkoutFormGroup.get('shippingAddress.state'); }
  get shippingAddressZipCode() { return this.checkoutFormGroup.get('shippingAddress.zipCode'); }
  get shippingAddressCountry() { return this.checkoutFormGroup.get('shippingAddress.country'); }

  get billingAddressStreet() { return this.checkoutFormGroup.get('billingAddress.street'); }
  get billingAddressCity() { return this.checkoutFormGroup.get('billingAddress.city'); }
  get billingAddressState() { return this.checkoutFormGroup.get('billingAddress.state'); }
  get billingAddressZipCode() { return this.checkoutFormGroup.get('billingAddress.zipCode'); }
  get billingAddressCountry() { return this.checkoutFormGroup.get('billingAddress.country'); }

  get creditCardType() { return this.checkoutFormGroup.get('creditCard.cardType'); }
  get creditCardNameOnCard() { return this.checkoutFormGroup.get('creditCard.nameOnCard'); }
  get creditCardNumber() { return this.checkoutFormGroup.get('creditCard.cardNumber'); }
  get creditCardSecurityCode() { return this.checkoutFormGroup.get('creditCard.securityCode'); }




  copyShippingAddressToBillingAddress(event: Event){
    const isChecked = (<HTMLInputElement>event.target).checked
    if(isChecked){
      this.checkoutFormGroup.controls['billingAddress'].setValue(this.checkoutFormGroup.controls['shippingAddress'].value);

      //fixes issue where state did not carry over when copying shipping info
      this.billingAddressStates = this.shippingAddressStates;

 
    }
    else{
      this.checkoutFormGroup.controls['billingAddress'].reset();

      //required clearance due to the forced addition
      this.billingAddressStates = [];
    }
  }
 
 
  onSubmit() {
    console.log("submit was registered")
    if (this.checkoutFormGroup.invalid){
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }
    //Setup Order
    let order = new Orders();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;

    //Get items within the cart
    const cartItems = this.cartService.cartItems;

     //creeate orderItems from cartITems
     //long way
    // let orderItems: OrderItem[] = [];
    // for (let i = 0; i < cartItems.length; i++){
    //   orderItems[i] = new OrderItem(cartItems[i]);
    // }
    //other way
    let orderItems: OrderItem[] = cartItems.map(tempCartItem => new OrderItem(tempCartItem));

    

    //setup purchase for shipping address
    let purchase = new Purchase();
    purchase.shippingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;
    const shippingState: State = JSON.parse(JSON.stringify(purchase.shippingAddress.state));
    const shippingCountry: Country = JSON.parse(JSON.stringify(purchase.shippingAddress.country));
    purchase.shippingAddress.state = shippingState.name;
    purchase.shippingAddress.country = shippingCountry.name;

    //setup purchase for billing address
    purchase.billingAddress = this.checkoutFormGroup.controls['billingAddress'].value;
    const billingState: State = JSON.parse(JSON.stringify(purchase.billingAddress.state));
    const billingCountry: Country = JSON.parse(JSON.stringify(purchase.billingAddress.country));
    purchase.billingAddress.state = shippingState.name;
    purchase.billingAddress.country = shippingCountry.name;

    //populate purchase data for customer
    purchase.customer = this.checkoutFormGroup.controls['customer'].value;

    //populatee purchase data for order and its orderitems
    purchase.order = order;
    purchase.orderItems = orderItems;

    //submit data to checkout Servicee
    this.checkoutService.placeOrder(purchase).subscribe(
      {
        next: response =>{
          alert('Your order has been recieved')

          //reset card
          this.resetCart();
        },
        error: err =>{
          alert(`there is an error: ${err.message} + this camee from an eerror`)
        }
      }
    )
  }
  resetCart() {
    //reset card data
    this.cartService.cartItems = [];
    //reset form data
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);
    //go back to products
    this.router.navigateByUrl("/products")
  }

  handleMonthsAndYears(){
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup?.value.expirationYear)

    //if the currnt year is the selected year, limit months
    let startMonth: number;

    if (currentYear === selectedYear){
      startMonth = new Date().getMonth() +1; 
    }

    else{
       startMonth = 1;
    }

    this.luv2ShopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        this.creditCardMonths = data;
      }
    )
  }

  //For STates and Countries
  getStates(formGroupName: string){
    const formGroup = this.checkoutFormGroup.get(formGroupName);

    const countryCode = formGroup?.value.country.code;
    const countryName = formGroup?.value.country.name;

    this.luv2ShopFormService.getStates(countryCode).subscribe(
      data =>{
        if (formGroupName === 'shippingAddress'){
          this.shippingAddressStates = data;
        }
        else{
          this.billingAddressStates = data;
        }

        //Select the first state as a default
        formGroup.get('state').setValue(data[0]);
      }
    )
  }
}
