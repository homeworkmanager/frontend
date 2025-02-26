type group = {
  group_id: number;
  group_name: string;
  course: number;
  ical_link: string;
  register_key: string;
};

type AdminGroupsResponse = group[];
