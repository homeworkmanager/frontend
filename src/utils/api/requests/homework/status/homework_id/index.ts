import { api } from '@/utils/api/instance';

type PostHomeworkStatusParams = Omit<ScheduleHomeworkElement, 'subjectName' | 'homeworkText' | 'files'>;

export type PostHomeworkStatusConfig = AxiosRequestConfig<PostHomeworkStatusParams>;

export const postHomeworkStatus = async ({ params, config }: PostHomeworkStatusConfig) =>
  api.post<PostHomeworkStatusResponse>(
    `/homework/status/${params.homeworkID}`,
    {
      homeworkID: params.homeworkID,
      status: params.isCompleted //Это же надо было тупому бекендеру додуматься в зависимости от запроса по-разному называть поле, выполняющее одиннаковыую функцию...
    },
    config
  );
