import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/index';
import { APIStatus } from '../../../lib/axiosAPI';
import { politicianAPI } from '../../../api/politicianAPI';
import { politicianActionCreators } from '../../../slices/politicianSlice';

export const useFetchLineChartVoters = () => {
  const [status, setStatus] = useState<APIStatus>(APIStatus.Initial);
  const { fetchVoteCountStatistics } = politicianAPI();
  const { setVoteCountStatistics } = politicianActionCreators();
  const shortLink = useSelector((s: RootState) => s?.politician?.data?.short_link);

  const fetch = useCallback(() => {
    setStatus(APIStatus.Loading);
    fetchVoteCountStatistics({
      onSuccess: (response) => {
        setVoteCountStatistics(response);
        setStatus(APIStatus.Success);
      },
      payload: {
        short_link: shortLink,
      },
    });
  }, [shortLink]);

  return { fetch, status };
};
