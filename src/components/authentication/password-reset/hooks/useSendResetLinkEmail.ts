import { useState } from 'react';
import { authAPI } from '../../../../api/authAPI';
import { APIStatus } from '../../../../lib/axiosAPI';

export const useSendResetLinkEmail = (setResetStep: (value: number) => void) => {
  const { sendResetLinkEmail } = authAPI();
  const [error, setError] = useState<string>();
  const [status, setStatus] = useState<APIStatus>(APIStatus.Initial);
  const send = (email: string) => {
    setStatus(APIStatus.Loading);
    sendResetLinkEmail({
      onSuccess: () => {
        setStatus(APIStatus.Success);
        setResetStep(2);
      },
      onError: (errorResponse) => {
        setStatus(APIStatus.Failure);
        setError(typeof errorResponse === 'string' ? errorResponse : errorResponse.email[0]);
      },
      payload: {
        email,
      }
    });
  };

  return { send, error, status };
};
