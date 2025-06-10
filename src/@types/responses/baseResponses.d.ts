interface BaseResponse {
  data: string;
  error?: string;
}

type FileElem = {
  FileID: number;
  FileName: string;
  FileURL: string;
  CreatedAt: string;
};

type FileSResponse = {
  filesErrMap: {
    [name: string]: number;
  };
  filesIdMap: {
    [name: string]: number;
  };
  filesURLMap: {
    [id: string]: string;
  };
};

type UserOrigin = {
  user_id: number;
  name: string;
  surname: string;
  email: string;
  role: number;
  group_name: string;
};
