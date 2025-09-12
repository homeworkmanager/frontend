interface CurrentGroup {
  group_id: number;
  name: string;
  course: number;
}

type AllGroupsResponse = CurrentGroup[] & BaseResponse;
