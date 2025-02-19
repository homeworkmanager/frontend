import * as Yup from 'yup';

export const ProfileSchema = Yup.object({
  name: Yup.string().required('Поле обязательно для заполнения'),
  surname: Yup.string().required('Поле обязательно для заполнения'),
  groupName: Yup.string().required('Поле обязательно для заполнения')
});

export type ProfileSchemaType = Yup.InferType<typeof ProfileSchema>;
