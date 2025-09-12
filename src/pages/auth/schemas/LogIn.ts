import * as Yup from 'yup';

export const LogInSchema = Yup.object({
  email: Yup.string().email('Недопустимый адрес').required('Поле обязательно для заполнения'),
  password: Yup.string()
    .min(6, 'Пароль должен содержать не менее 6 символов')
    .required('Поле обязательно для заполнения')
});

export type LogInSchemaType = Yup.InferType<typeof LogInSchema>;
