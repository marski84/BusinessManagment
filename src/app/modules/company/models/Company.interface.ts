export interface CompanyDataInterface {
  _id: string,
  name: string
}

export interface CompanyInterface {
  message: string,
  data: CompanyDataInterface[]
}
