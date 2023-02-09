import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, Observable, retry, retryWhen, take } from 'rxjs';
import { Product } from 'src/model/product.model';
import { MapperHelper } from '../helper/Mapper.helper';

@Injectable()
export class ProductService {

  private static API_URL = "https://young-sands-07814.herokuapp.com/api/products";

  constructor(
    private http: HttpClient
  ) { }

  getProducts(limit = 10, offset = 0): Observable<Product[]> {
    return this.http.get<Record<string, unknown>[]>(ProductService.API_URL, {
      params: { limit, offset }
    }).pipe(
      retry({
        count: 10,
        delay: 1000,
        resetOnSuccess: true
      }),
      map((datalist: Record<string, unknown>[]) => datalist.map(MapperHelper.APIToProduct))
    );
  }

  getProductById<T>(id: T): Observable<Product> {
    return this.http.get<Record<string, unknown>>(`${ProductService.API_URL}/${id}`)
      .pipe(
        map((data: Record<string, unknown>) => MapperHelper.APIToProduct(data))
      );
  }

  createProduct<T>(productDTO: T): Observable<Product> {
    return this.http.post(ProductService.API_URL, productDTO)
      .pipe(
        map((data: Record<string, any>) => MapperHelper.APIToProduct(data))
      );
  }

  updateProduct<T>(id: string, productDTO: T): Observable<Product>{
    return this.http.put<Record<string, unknown>>(`${ProductService.API_URL}/${id}`, productDTO)
      .pipe(
        map(MapperHelper.APIToProduct)
      );
  }

  deleteProduct(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${ProductService.API_URL}/${id}`);
  }
}
