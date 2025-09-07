import React from 'react';

import {
  LogInSchema,
  LogInSchemaType,
  ProfileSchema,
  ProfileSchemaType,
  RegisterSchema,
  RegisterSchemaType
} from '../schemas';

import { routerNavigator } from '@/app/modules/Navigator';
import { TIME_TO_GROUPS_REFRESH } from '@/utils/constants/time';
import { useLazyGetAllGroupsQuery } from '@/utils/redux/apiSlices/group/groupApi';
import { usePostAuthMutation, usePostRegisterMutation } from '@/utils/redux/apiSlices/user/userApi';
import { JournalChooseMedia } from '@/utils/services/chooseMedia';
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

  const [getAllGroupsTrigger, getAllGroups] = useLazyGetAllGroupsQuery({ pollingInterval: TIME_TO_GROUPS_REFRESH });

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

  const actionState: Record<Stages, State> = {
    register: postRegisterState,
    profile: postRegisterState,
    login: postAuthState
  };

  const groupsState = {
    isInitialized: !getAllGroups.isUninitialized,
    isLoading: getAllGroups.isLoading,
    isError: getAllGroups.isError,
    isSuccess: getAllGroups.isSuccess
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
        routerNavigator.to(JournalChooseMedia, { replace: true });
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
    func: { changeStage, getAllGroupsTrigger },
    state: { action: actionState[stage], groups: groupsState }
  };
};
