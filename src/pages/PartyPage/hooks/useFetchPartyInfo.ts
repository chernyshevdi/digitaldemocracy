import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { APIStatus } from '../../../lib/axiosAPI';
import { partyAPI } from '../../../api/partyAPI';
import { partyActionCreators } from '../../../slices/partySlice';

export const useFetchPartyInfo = () => {
  const [status, setStatus] = useState<APIStatus>(APIStatus.Initial);
  const { fetchPartyInfo } = partyAPI();
  const { setPartyInfo } = partyActionCreators();
  const { short_link }: { short_link: string } = useParams();

  const fetch = useCallback(() => {
    setStatus(APIStatus.Loading);
    fetchPartyInfo({
      onSuccess: (response) => {
        setPartyInfo(response);
        setStatus(APIStatus.Success);
      },
      onError: () => setStatus(APIStatus.Failure),
      payload: {
        short_link
      }
    });
  }, []);

  return { fetch, status };
};
