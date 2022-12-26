export interface ResponseModel<Type> {
  data: Type,
  status: number,
  message: string,
}
