import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@repo/ui/components/ui/form';
import { FormProvider, useForm } from 'react-hook-form';
import {
  checkCredentialsAvailabilityApi,
  registerUserApi,
} from '../../actions/auth/sign-up';
import {
  RegisterUserInfo,
  UserInfoSchema,
  UserInfoType,
} from '../../types/auth/signup';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@repo/ui/components/ui/button';
import { Input } from '@repo/ui/components/ui/input';
import { useRouter } from 'next/navigation';
import { CommonResponse } from '../../types/responseType';
import ProgressBar from '../pages/signup/ProgressBar';

interface UserInfoProps {
  terms: {
    term1: boolean;
    term2: boolean;
    term3: boolean;
  };
  email: string;
  emailVerificationCode: string;
}

const formInputs: Array<{
  name: keyof UserInfoType;
  label: string;
  type: string;
}> = [
  { name: 'loginId', label: '아이디', type: 'text' },
  { name: 'password', label: '비밀번호', type: 'password' },
  { name: 'passwordConfirm', label: '비밀번호 확인', type: 'password' },
  { name: 'nickname', label: '닉네임', type: 'text' },
];

export default function UserInfoForm({
  terms,
  email,
  emailVerificationCode,
}: UserInfoProps) {
  const router = useRouter();
  const form = useForm<UserInfoType>({
    resolver: zodResolver(UserInfoSchema),
    defaultValues: {
      loginId: '',
      password: '',
      passwordConfirm: '',
      nickname: '',
    },
  });

  const checkLoginIdAvailability = async (
    loginId: string
  ): Promise<boolean> => {
    const response = await checkCredentialsAvailabilityApi(loginId, 'loginid');
    return response;
  };

  const registerUser = async (
    values: RegisterUserInfo
  ): Promise<CommonResponse<null>> => {
    const response = await registerUserApi(values);
    return response;
  };

  const onSubmit = async (values: UserInfoType) => {
    const response = await checkLoginIdAvailability(values.loginId);
    if (!response) {
      form.setError('loginId', {
        type: 'manual',
        message: '이미 사용중인 아이디입니다.',
      });
      return;
    }

    const body = {
      loginId: values.loginId,
      password: values.password,
      email: email,
      nickname: values.nickname,
    };

    const register = await registerUser(body);

    if (!register.isSuccess) {
      form.setError('nickname', {
        type: 'manual',
        message: '서버 오류 입니다. 관리자에게 문의해 주세요',
      });
    } else {
      router.push('/sign-in');
    }
  };

  return (
    <>
      <ProgressBar step={2} totalStep={3} />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {formInputs.map((input, index) => (
            <FormField
              key={index}
              control={form.control}
              name={input.name}
              render={({ field }) => (
                <FormItem className="mx-10 mb-6">
                  <FormControl>
                    <Input
                      className="signup-input"
                      placeholder={input.label}
                      type={input.type}
                      {...field}
                    />
                  </FormControl>
                  {form.formState.errors?.[input.name] && <FormMessage />}
                </FormItem>
              )}
            />
          ))}
          <div className="flex justify-center">
            <Button className="signup-button">회원가입</Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
