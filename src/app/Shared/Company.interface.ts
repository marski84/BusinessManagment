export interface CompanyDataInterface {
  _id: string;
  name: string;
}

export interface CompanyResponseInterface {
  data: CompanyDataInterface[];
}

type ApiReponse<T> = { // better that above :)
  data: T;
  message: string;
};
