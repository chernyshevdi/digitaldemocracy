import { useCallback, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { useParams } from 'react-router-dom';
import { APIStatus } from '../../../lib/axiosAPI';
import { partyAPI } from '../../../api/partyAPI';
import { partyActionCreators } from '../../../slices/partySlice';
import { getItem } from '../../../lib/localStorageManager';

export const useFetchPartyPoliticians = () => {
  const [status, setStatus] = useState<APIStatus>(APIStatus.Initial);
  const { fetchPartyPoliticians } = partyAPI();
  const { setPartyPoliticians } = partyActionCreators();
  const { sort_direction, sort_field } = useSelector((s: RootState) => s.party);
  const token = getItem('token');

  const fetch = useCallback(
    (party_id, page) => {
      setStatus(APIStatus.Loading);
      fetchPartyPoliticians({
        onSuccess: (response) => {
          setPartyPoliticians(response);
          setStatus(APIStatus.Success);
        },
        onError: () => setStatus(APIStatus.Failure),
        payload: {
          party_id,
          token,
          params: {
            orderBy: sort_direction,
            sortBy: sort_field,
            page
          },
        },
      });
    },
    [sort_direction, sort_field, token]
  );

  return { fetch, status };
};
