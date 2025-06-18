import * as Yup from 'yup';

const AdminSchema = Yup.object({
  adminGroup: Yup.string().required('Поле обязательно для заполнения'),
  adminCourse: Yup.string().max(1).required('Поле обязательно для заполнения'),
  adminIcal: Yup.string().required('Поле обязательно для заполнения')
});

type AdminSchemasType = Yup.InferType<typeof AdminSchema>;

export { AdminSchema, type AdminSchemasType };
