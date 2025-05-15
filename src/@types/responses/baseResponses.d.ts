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
    [string]: number;
  };
  filesIdMap: {
    [string]: number;
  };
  files: FileElem[];
};

type UserOrigin = {
  user_id: number;
  name: string;
  surname: string;
  email: string;
  role: number;
  group_name: string;
};
