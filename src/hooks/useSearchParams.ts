import { useHistory } from 'react-router-dom';
import { useMemo } from 'react';

export type HistoryParamValue = string | undefined | null;

export const pushUrlHistoryParamFn = (history: any, paramName: string | Array<string>) => (
  paramValue: HistoryParamValue
) => {
  const params = new URLSearchParams(history.location.search);
  if (paramName instanceof Array) {
    if (!paramValue) {
      for (let i = 0; i < paramName.length; i++) {
        const name = paramName[i];
        params.delete(name);
      }
    }
  } else if (paramValue) {
    params.set(paramName, paramValue);
  } else {
    params.delete(paramName);
  }
  history.push({ ...history.location, search: params.toString() });
};

export const useSearchParams = (
  ...paramNames: Array<string>
): { [paramName: string]: { value?: string; setValue: (paramValue?: string
  ) => void } } => {
  const history = useHistory();
  const {
    location: { search },
  } = history;

  return useMemo(() => {
    const urlParams = new URLSearchParams(search);
    return paramNames.reduce(
      (res, paramName) => ({
        ...res,
        [paramName]: {
          value: urlParams.get(paramName) || undefined,
          setValue: pushUrlHistoryParamFn(history, paramName),
        },
      }),
      {}
    );
  }, [history, paramNames, search]);
};
