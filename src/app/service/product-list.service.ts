import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from 'src/model/product.model';
import { MapperHelper } from '../helper/Mapper.helper';

@Injectable()
export class ProductService {

  private static API_URL = "https://young-sands-07814.herokuapp.com/api/products";

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Record<string, any>[]>(ProductService.API_URL+"?limit=10&offset=1")
      .pipe(
        map((dataList: Record<string, any>[]) => {
          return dataList.map(MapperHelper.APIToProduct);
        })
      );
  }

  getProductById<T>(id: T): Observable<Product> {
    return this.http.get<Record<string, any>>(`${ProductService.API_URL}/${id}`)
      .pipe(
        map((data: Record<string, any>) => MapperHelper.APIToProduct(data))
      );
  }

  createProduct<T>(productDTO: T): Observable<Product> {
    return this.http.post(ProductService.API_URL, productDTO)
      .pipe(
        map((data: Record<string, any>) => MapperHelper.APIToProduct(data))
      );
  }

  updateProduct<T>(id: string, productDTO: T): Observable<Product>{
    return this.http.put<Record<string, any>>(`${ProductService.API_URL}/${id}`, productDTO)
      .pipe(
        map(MapperHelper.APIToProduct)
      );
  }

  deleteProduct(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${ProductService.API_URL}/${id}`);
  }
}
