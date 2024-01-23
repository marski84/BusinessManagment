export interface WorkerData {
  _id: string,
  name: string,
  surname: string,
  companyId: string
}

// CompanyWorkersReponseInterface .map(res => res.data)
export interface CompanyWorkersResponseInterface {
  data: WorkerData[]
}
