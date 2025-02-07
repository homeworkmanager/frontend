interface BaseResponse {
  data: string;
  error?: string;
}

type UserOrigin = {
  user_id: number;
  name: string;
  surname: string;
  email: string;
  role: number;
  group_name: string;
};
