import React from 'react';
import { useNavigate } from 'react-router-dom';

import { LogInSchema, RegisterSchema, RegisterSchemaType } from '../schemas';

import { EntryContext } from '@/App/modules/AuthContext';
import { getUserData } from '@/utils/api/requests/user/get';
import { JournalChooseMedia } from '@/utils/helpers/ChooseMedia';
import { useGetAllGroupsQuery } from '@/utils/redux/apiSlices/groupApiSlice/groupApi';
import { usePostAuthMutation, usePostRegisterMutation } from '@/utils/redux/apiSlices/userApiSlice/userApi';
import { useAppDispatch } from '@/utils/redux/store';
import { logIn } from '@/utils/redux/storeSlices/userSlice/slice';
import { useFormik } from 'formik';

export const useAuth = () => {
  const [stage, setStage] = React.useState<'login' | 'register'>('login');
  const dispatch = useAppDispatch();
  const { isEntry, setIsEntry } = React.useContext(EntryContext);
  const navigate = useNavigate();

  const getAllGroups = useGetAllGroupsQuery(undefined, {
    selectFromResult: (data) => {
      return data;
    }
  });

  const getAllGroupsResponse = getAllGroups?.data;

  const groupsList = getAllGroupsResponse?.reduce((acc: Record<string, number>, group) => {
    acc[group.name] = group.group_id;
    return acc;
  }, {});

  const authInitValues = {
    name: '',
    surname: '',
    groupName: '',
    email: '',
    password: ''
  };

  const changeStage = () => {
    setStage((prev) => (prev === 'login' ? 'register' : 'login'));
    form.setErrors({});
    form.setTouched({}, false);
  };

  const [postRegister, { isLoading: isRegisterLoading, isError: isRegisterError, isSuccess: isRegisterSuccess }] =
    usePostRegisterMutation();
  const [postAuth, { isLoading: isAuthLoading, isError: isAuthError, isSuccess: isAuthSuccess }] =
    usePostAuthMutation();

  const currentState =
    stage === 'register'
      ? {
        isLoading: isRegisterLoading,
        isError: isRegisterError,
        isSuccess: isRegisterSuccess
      }
      : {
        isLoading: isAuthLoading,
        isError: isAuthError,
        isSuccess: isAuthSuccess
      };

  const getUserAfterAuth = async () => {
    try {
      const { data } = await getUserData();
      dispatch(
        logIn({
          role: data.role,
          name: data.name,
          surname: data.surname,
          email: data.email,
          group_name: data.group_name
        })
      );
      if (isEntry) {
        setIsEntry();
      }
      setIsEntry();
      navigate(JournalChooseMedia);
    } catch (error) {
      console.log(error);
    }
  };

  const setSubmit = async (values: RegisterSchemaType) => {
    if (stage !== 'login') {
      const postRegisterResponse = await postRegister({
        params: {
          name: values.name,
          surname: values.surname,
          email: values.email,
          password: values.password,
          groupId: groupsList?.[values.groupName] as number
        }
      });

      if (!postRegisterResponse.error) {
        setStage('login');
      } else {
        console.log(postRegisterResponse.error);
      }
    } else {
      const postAuthResponse = await postAuth({
        params: {
          email: values.email,
          password: values.password
        }
      });
      if (!postAuthResponse.error) {
        getUserAfterAuth();
      }
    }
  };

  const form = useFormik<RegisterSchemaType>({
    initialValues: authInitValues,
    validationSchema: stage === 'login' ? LogInSchema : RegisterSchema,
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
    state: currentState
  };
};
