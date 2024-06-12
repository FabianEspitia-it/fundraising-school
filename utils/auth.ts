import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';

import { AppLink } from '@/data/enums';
import { type UserActions } from '@/stores/user-store';

export const validateNewUser = async (
  user: Session,
  router: AppRouterInstance,
  updateUserInfo: UserActions['updateUserInfo'],
) => {
  if (user.user?.name === '' || user.user?.name === null || !user.user?.name) {
    console.error('User name is empty');
    return;
  }

  let response;
  try {
    response = await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user }),
    });

    if (response.status !== 200) {
      console.error('Error validating user: ', response.status);
      return;
    }

    const data = await response.json();

    let image = '';
    if (user.user.image) {
      image = user.user.image;
    }

    if (data.image_url !== image) {
      const responseUpdateImage = await fetch('/api/user/image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: image, email: user.user.email as string }),
      });

      if (responseUpdateImage.status !== 200) {
        console.error('Error validating user: ', response.status);
      }
    }

    if (data.message === 'User exists') {
      updateUserInfo(data.nickname, data.contact_email, user.user.email as string, image);
      router.replace(AppLink.Product.Home);

      return;
    }

    if (data.message === 'User exist without contact info') {
      updateUserInfo('', '', user.user.email as string, image);
      router.replace(AppLink.Activation.BaseData);

      return;
    }

    if (data.message === 'User exist without info about round') {
      updateUserInfo(data.nickname, data.contact_email, user.user.email as string, image);
      router.replace(AppLink.Activation.Round);

      return;
    }

    if (data.message === 'User created') {
      updateUserInfo('', '', user.user.email as string, image);
      router.replace(AppLink.Activation.BaseData);

      return;
    }

    console.error('Error creating user');
  } catch (error) {
    console.error('Error validating user', error);

    if (!response) {
      console.error('Error validating user');
      return;
    }

    if (response.status === 400) {
      signOut({ callbackUrl: AppLink.Auth.SignIn });
    }
  }
};

export const updateContactInfoUser = async ({
  contact_email,
  email,
  nickname,
}: {
  contact_email: string;
  email: string;
  nickname: string;
}) => {
  const response = await fetch('/api/user/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ contact_email, email, nickname }),
  });

  if (response.status !== 200) {
    throw new Error('Error updating contact info');
  }
};

export type RoundRequestBody = {
  seeking_capital: boolean;
  accept_terms_and_condition: boolean;
  email: string;
  round_name?: string;
};

export const updateRoundInfoUser = async (values: RoundRequestBody) => {
  const response = await fetch('/api/user/round', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  });

  if (response.status !== 200) {
    throw new Error('Error updating contact info');
  }
};
