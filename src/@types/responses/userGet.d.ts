type GetUserResponse = {
  user_id: number;
  name: string;
  surname: string;
  email: string;
  role: number;
  group_name: string;
} & BaseResponse;
