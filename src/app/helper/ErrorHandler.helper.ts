import { HttpErrorResponse, HttpStatusCode } from "@angular/common/http";

export class ErrorHandlerHelper{
  static httpHandler<T extends HttpErrorResponse>(error: T): never {
    switch(error.status){
      case HttpStatusCode.InternalServerError:
        throw new Error("Ocurrió un error interno en el API");
      case HttpStatusCode.NotFound:
        throw new Error("No se encontró la entidad requerida");
      case HttpStatusCode.BadRequest:
        throw new Error("Hay un problema con la información enviada");
      default:
        throw new Error(`Ocurrió un error inesperado. ERROR: ${error.message}`);
    }
  }
}
