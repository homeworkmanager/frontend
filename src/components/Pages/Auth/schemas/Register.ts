import { ProfileSchema } from './Profile';
import * as Yup from 'yup';

export const RegisterSchema = Yup.object({
  registerKey: Yup.string().required('Поле обязательно для заполнения')
}).concat(ProfileSchema);

export type RegisterSchemaType = Yup.InferType<typeof RegisterSchema>;
