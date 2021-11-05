import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
  @Input() name: String | undefined;
  @Input() price: String | undefined;
  @Input() category: String | undefined;
  @Input() image: String | undefined;
  @Input() description: String | undefined;

  ngOnInit(): void {
  }

  cart = document.querySelector('#cart');

  addCart = ()=>{
    let count = this.cart?.getAttribute('data-content');
    count = (parseInt(count?count:"0") + 1).toString();
    this.cart?.setAttribute('data-content', count?count:"0");
  }
}
