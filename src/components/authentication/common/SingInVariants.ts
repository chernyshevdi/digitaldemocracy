import GoogleIcon from '../../../icons/Google';
import YandexIcon from '../../../icons/Yandex';

export enum SingInSocialN {
  Google = 'Google',
  Yandex = 'Yandex'
}

export const singInVariants = [
  {
    title: 'Вход с аккаунтом Google',
    Icon: GoogleIcon,
    type: SingInSocialN.Google,
  },
  {
    title: 'Вход с аккаунтом Yandex',
    Icon: YandexIcon,
    type: SingInSocialN.Yandex,
  }
];
