import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{

  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;
  orderStarted: boolean = false;
  isDisabled: boolean = false;

  //Pagination Properties
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  //Pagination Properties FOR KEYWORD SEARCHES
  previousKeyword: string = "";


  //Added Order message
  alertMessagee: string = "Order is placed succesesfully";
  
  

constructor(private productService: ProductService, private cartService: CartService,
  private route: ActivatedRoute){

}



ngOnInit(): void {
  this.route.paramMap.subscribe(() =>{
    this.listProducts();
  });
  
}

listProducts(){

  this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    }
    else {
      this.handleListProducts();
    }

}


handleListProducts() {

  // check if "id" parameter is available
  const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

  if (hasCategoryId) {
    // get the "id" param string. convert string to a number using the "+" symbol
    this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
  }
  else {
    // not category id available ... default to category id 1
    this.currentCategoryId = 1;
  }

//Check if we have a different category then previous
  //We need to check this beecause if th category changees, so will the pagination

  if(this.previousCategoryId != this.currentCategoryId){
    this.thePageNumber=1;
  }

  this.previousCategoryId = this.currentCategoryId;
  console.log(`currentCategoryId=${this.currentCategoryId}`)


  // now get the products for the given category id
  this.productService.getProductListPaginate(
    this.thePageNumber - 1,
    this.thePageSize, 
    this.currentCategoryId).subscribe(
      this.processResult());
  
}
handleSearchProducts(){
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;


  // If we have a diffrent keyword than previous
  //Set pagenumber to 1
  if(this.previousKeyword != theKeyword){
    this.thePageNumber = 1;
  }
  this.previousKeyword = theKeyword;
  console.log(`current keyword=${theKeyword}`);
  this.productService.searchProductsPaginate(this.thePageNumber -1, this.thePageSize, theKeyword).subscribe(this.processResult());




    //now search for products with given keyword

    this.productService.searchProducts(theKeyword).subscribe(
      data =>{
        this.products = data;
      }
    )
}
  processResult() {
    return(data: any) =>{
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    }
  }

updatePageSize(pageSize: string){

  this.thePageSize = +pageSize;
  this.thePageNumber = 1;
  this.listProducts();

}

addToCart(theProduct: Product){
  console.log(`adding to cart: ${theProduct.name}, ${theProduct.unitPrice}`);

  //todo, add real cart/actual functionality

  

  const theCartItem = new CartItem(theProduct);
  this.cartService.addToCart(theCartItem);
  alert(this.alertMessagee);

}

toggleShowTable(){
  this.orderStarted = !this.orderStarted;
  this.isDisabled = !this.isDisabled;
}
}
