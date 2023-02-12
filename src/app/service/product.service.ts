import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, retry } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from 'src/model/product.model';
import { MapperHelper } from '../helper/Mapper.helper';

@Injectable()
export class ProductService {

  private static API_URL = `${environment.HOST_API_STORE}/api/products`;
  private retryPipe = <T>() => retry<T>({
    count: 10,
    delay: 1000,
    resetOnSuccess: true
  });

  constructor(
    private http: HttpClient
  ) { }

  getProducts(limit = 10, offset = 0): Observable<Product[]> {
    return this.http.get<Record<string, unknown>[]>(ProductService.API_URL, {
      params: { limit, offset }
    }).pipe(
      this.retryPipe(),
      map((datalist: Record<string, unknown>[]) => datalist.map(MapperHelper.APIToProduct))
    );
  }

  getProductById<T>(id: T): Observable<Product> {
    return this.http.get<Record<string, unknown>>(`${ProductService.API_URL}/${id}`)
      .pipe(
        this.retryPipe(),
        map((data: Record<string, unknown>) => MapperHelper.APIToProduct(data))
      );
  }

  createProduct<T>(productDTO: T): Observable<Product> {
    return this.http.post(ProductService.API_URL, productDTO)
      .pipe(
        this.retryPipe(),
        map((data: Record<string, any>) => MapperHelper.APIToProduct(data))
      );
  }

  updateProduct<T>(id: string, productDTO: T): Observable<Product>{
    return this.http.put<Record<string, unknown>>(`${ProductService.API_URL}/${id}`, productDTO)
      .pipe(
        this.retryPipe(),
        map(MapperHelper.APIToProduct)
      );
  }

  deleteProduct(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${ProductService.API_URL}/${id}`)
      .pipe(
        this.retryPipe()
      );
  }
}
