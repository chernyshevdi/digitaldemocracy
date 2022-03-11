import firebase from 'firebase';

export const useSendCodeFirebase = (setStep?: (value: number) => void, nextStep?: number, setError?: (value: string) => void) => {
  const sendCode = (phone: string, appVerifier: any) => {
    firebase.auth().signInWithPhoneNumber(phone, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        if (setStep) {
          setStep(nextStep);
        }
      }).catch((err) => {
        console.log('ERRRO: ', err);
        window.grecaptcha.reset();
        if (setError) {
          setError(err.message);
        }
      });
  };
  return { sendCode };
};
