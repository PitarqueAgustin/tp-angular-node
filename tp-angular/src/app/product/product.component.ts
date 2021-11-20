import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { Product } from '../response';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
  @Input() _id: String | undefined;
  @Input() name: String | undefined;
  @Input() price: String | undefined;
  @Input() category: String | undefined;
  @Input() image: String | undefined;
  @Input() description: String | undefined;

  @Output() productEvent = new EventEmitter<Product>();

  product : Product = {
    _id: undefined,
    name: undefined,
    price: undefined,
    category: undefined,
    image: undefined,
    description: undefined,
    quantity: 0
  };

  ngOnInit(): void {
    this.product = {
      _id: this._id,
      name: this.name,
      price: this.price,
      category: this.category,
      image: this.image,
      description: this.description,
      quantity: 1
    };
  }

  sendProduct() {
    this.productEvent.emit(this.product)
  }

  cart = document.querySelector('#cart');

  addCart = ()=>{
    let count = this.cart?.getAttribute('data-content');
    count = (parseInt(count?count:"0") + 1).toString();
    this.cart?.setAttribute('data-content', count?count:"0");
    window.localStorage.setItem("cart", count);
    this.sendProduct();
  }
}
