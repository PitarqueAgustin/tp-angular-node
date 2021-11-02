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
}
