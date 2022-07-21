declare module Api {
  declare module Comments {
    export interface Data {
      id: number;
      post_id: number;
      name: string;
      email: string;
      body: string;
    }
  }
}
