export default class ProductEntity {
  id: string
  title: string
  description: string
  price: number
  ownerId: string
  categoryId: string


  constructor(id: string, title: string, description: string, price: number, ownerId: string, categoryId: string) {
    this.id = id
    this.title = title
    this.description = description
    this.price = price
    this.ownerId = ownerId
    this.categoryId = categoryId
  }
}