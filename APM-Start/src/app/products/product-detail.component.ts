import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './products.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle: string = 'Product Detail';
  product: IProduct;

  constructor(private route: ActivatedRoute, private productService: ProductService, private router: Router) {
    console.log(this.route.snapshot.paramMap.get('id'));
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }

  ngOnInit(): void {
    let id = +this.route.snapshot.paramMap.get('id');
    this.pageTitle += `: ${id}`
    this.productService.getProducts().subscribe({
      next: products => {
        for(var index in products) {
          if(+products[index].productId === id) {
            this.product = products[index];
          }
        }
      }
    })
  }

}
