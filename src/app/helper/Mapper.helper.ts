import { Product } from "src/model/product.model";

export class MapperHelper {
  static APIToProduct(rawData: Record<string, any>): Product {
    return {
      id: rawData["id"],
      imageUrl: rawData["images"],
      name: rawData["title"],
      price: rawData["price"],
      provider: rawData["category"]["name"]
    }
  }
}
