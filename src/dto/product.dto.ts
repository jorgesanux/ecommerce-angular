export interface ProductCreateDTO {
  title: string,
  price: number,
  description: string,
  categoryId: number,
  images: string[]
}

export type ProductUpdateDTO = Partial<ProductCreateDTO>
