import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from 'src/model/product.model';

@Injectable()
export class ProductListService {

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Record<string, any>[]>("https://fakestoreapi.com/products")
      .pipe(
        map((dataList: Record<string, any>[]) => {
          const products: Product[] = dataList.map( data => ({
            id: data["id"],
            imageUrl: data["image"],
            name: data["title"],
            price: data["price"],
            provider: data["category"]
          }));
          return products;
        })
      );
  }

}
