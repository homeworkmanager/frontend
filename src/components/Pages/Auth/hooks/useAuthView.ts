import React from 'react';

import {
  LogInSchema,
  LogInSchemaType,
  ProfileSchema,
  ProfileSchemaType,
  RegisterSchema,
  RegisterSchemaType
} from '../schemas';

import { routerNavigator } from '@/components/modules/Router/Navigator';
import { checkUserData } from '@/utils/helpers/checkUserData';
import { JournalChooseMedia } from '@/utils/helpers/chooseMedia';
import { useGetAllGroupsQuery } from '@/utils/redux/apiSlices/groupApiSlice/groupApi';
import { usePostAuthMutation, usePostRegisterMutation } from '@/utils/redux/apiSlices/userApiSlice/userApi';
import { useAppDispatch } from '@/utils/redux/store';
import { logIn } from '@/utils/redux/storeSlices/userSlice/slice';
import { useFormik } from 'formik';

type Stages = 'login' | 'profile' | 'register';

interface State {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

const authInitValues = {
  name: '',
  surname: '',
  groupName: '',
  registerKey: '',
  email: '',
  password: ''
};

export const useAuthView = () => {
  const [stage, setStage] = React.useState<Stages>('login');
  const dispatch = useAppDispatch();

  const getAllGroups = useGetAllGroupsQuery(undefined);

  const getAllGroupsResponse = getAllGroups?.data;

  const groupsList = getAllGroupsResponse?.reduce((acc: Record<string, number>, group) => {
    acc[group.name] = group.group_id;
    return acc;
  }, {});

  const changeStage = (stage: Stages) => {
    setStage(stage);
    form.setErrors({});
    form.setTouched({}, false);
  };

  const [postRegister, postRegisterState] = usePostRegisterMutation();
  const [postAuth, postAuthState] = usePostAuthMutation();

  const stateByStage: Record<Stages, State> = {
    register: postRegisterState,
    profile: postRegisterState,
    login: postAuthState
  };

  const getUserAfterAuth = async () => {
    try {
      const { data } = await checkUserData();
      dispatch(
        logIn({
          role: data.role,
          name: data.name,
          surname: data.surname,
          email: data.email,
          group_name: data.group_name
        })
      );
      routerNavigator.to(JournalChooseMedia, { replace: true });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const setSubmit = async (values: RegisterSchemaType & LogInSchemaType & ProfileSchemaType) => {
    if (stage === 'login') {
      const postAuthResponse = await postAuth({
        params: {
          email: values.email,
          password: values.password
        }
      });

      if (!postAuthResponse.error) {
        await getUserAfterAuth();
        return;
      }
    }

    if (stage === 'profile') {
      changeStage('register');
      return;
    }

    if (stage === 'register') {
      const postRegisterResponse = await postRegister({
        params: {
          name: values.name,
          surname: values.surname,
          email: values.email,
          registerKey: values.registerKey,
          password: values.password,
          groupId: groupsList?.[values.groupName] as number
        }
      });

      if (!postRegisterResponse.error) {
        changeStage('login');
        return;
      }
      // eslint-disable-next-line no-console
      console.log(postRegisterResponse.error);
    }
  };

  const schemas = {
    login: LogInSchema,
    profile: ProfileSchema,
    register: RegisterSchema
  } as const;

  const form = useFormik({
    initialValues: authInitValues,
    validationSchema: schemas[stage],
    validateOnBlur: false,
    onSubmit: (values) => {
      setSubmit(values);
    }
  });

  return {
    form,
    stage,
    groups: getAllGroupsResponse,
    func: { changeStage },
    state: stateByStage[stage]
  };
};
