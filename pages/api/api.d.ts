declare module Api {
  declare module Users {
    export interface FetchUsersResponse {
      data: Api.Users.Data[];
      maxPageSize: number;
    }
    export interface Data {
      id: number;
      name: string;
      email: string;
      gender: string;
      status: string;
    }
  }
}
