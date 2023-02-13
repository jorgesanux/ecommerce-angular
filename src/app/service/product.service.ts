import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from 'src/model/product.model';
import { ErrorHandlerHelper } from '../helper/ErrorHandler.helper';
import { MapperHelper } from '../helper/Mapper.helper';

@Injectable()
export class ProductService {

  private static API_URL = `${environment.HOST_API_STORE}/api/products`;
  private retryPipe = <T>() => retry<T>({
    count: 3,
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
      map((datalist: Record<string, unknown>[]) => datalist.map(MapperHelper.APIToProduct)),
      catchError((error: HttpErrorResponse) => {
        switch(error.status){
          case HttpStatusCode.NotFound:
            throw new Error("No se encontró la lista de los productos");
          default:
            ErrorHandlerHelper.httpHandler(error);
        }
      })
    );
  }

  getProductById<T>(id: T): Observable<Product> {
    return this.http.get<Record<string, unknown>>(`${ProductService.API_URL}/${id}`)
      .pipe(
        this.retryPipe(),
        map((data: Record<string, unknown>) => MapperHelper.APIToProduct(data)),
        catchError((error: HttpErrorResponse) => {
          switch(error.status){
            case HttpStatusCode.NotFound:
              throw new Error("El producto no existe");
            default:
              ErrorHandlerHelper.httpHandler(error);
          }
        })
      );
  }

  createProduct<T>(productDTO: T): Observable<Product> {
    return this.http.post(ProductService.API_URL, productDTO)
      .pipe(
        this.retryPipe(),
        map((data: Record<string, any>) => MapperHelper.APIToProduct(data)),
        catchError((error: HttpErrorResponse) => {
          switch(error.status){
            case HttpStatusCode.BadRequest:
              throw new Error("La información para crear el producto no es correcta");
            default:
              ErrorHandlerHelper.httpHandler(error);
          }
        })
      );
  }

  updateProduct<T>(id: string, productDTO: T): Observable<Product>{
    return this.http.put<Record<string, unknown>>(`${ProductService.API_URL}/${id}`, productDTO)
      .pipe(
        this.retryPipe(),
        map(MapperHelper.APIToProduct),
        catchError((error: HttpErrorResponse) => {
          switch(error.status){
            case HttpStatusCode.BadRequest:
              throw new Error("La información para actualizar el producto no es correcta");
            default:
              ErrorHandlerHelper.httpHandler(error);
          }
        })
      );
  }

  deleteProduct(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${ProductService.API_URL}/${id}`)
      .pipe(
        this.retryPipe(),
        catchError((error: HttpErrorResponse) => {
          ErrorHandlerHelper.httpHandler(error);
        })
      );
  }
}
