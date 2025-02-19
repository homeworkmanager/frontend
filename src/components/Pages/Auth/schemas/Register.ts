import * as Yup from 'yup';

export const RegisterSchema = Yup.object({
  name: Yup.string().required('Поле обязательно для заполнения'),
  surname: Yup.string().required('Поле обязательно для заполнения'),
  groupName: Yup.string().required('Поле обязательно для заполнения'),
  registerKey: Yup.string().required('Поле обязательно для заполнения'),
  email: Yup.string().email('Недопустимый адрес').required('Поле обязательно для заполнения'),
  password: Yup.string()
    .min(6, 'Пароль должен содержать не менее 6 символов')
    .required('Поле обязательно для заполнения')
});

export type RegisterSchemaType = Yup.InferType<typeof RegisterSchema>;
