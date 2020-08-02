export interface Category {
  // eslint-disable-next-line camelcase
  category_id: number
  // eslint-disable-next-line camelcase
  parent_id: number | null
  name: string
  url: string
}
