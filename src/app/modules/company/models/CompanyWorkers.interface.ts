export interface WorkerData {
  _id: string,
  name: string,
  surname: string,
  companyId: string
}

export interface CompanyWorkersInterface {
  message: string
  data: WorkerData[]
}
