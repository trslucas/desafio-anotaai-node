export default class CategoryEntitiy {
  id: string
  title: string
  description: string
  ownerId: number

  constructor(id: string, title: string, description: string, ownerId: number) {
    this.id = id
    this.title = title
    this.description = description
    this.ownerId = ownerId
  }

}