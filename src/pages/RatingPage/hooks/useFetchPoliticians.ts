import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { useParams } from 'react-router-dom';
import { APIStatus } from '../../../lib/axiosAPI';
import { ratingAPI } from '../../../api/ratingAPI';
import { ratingActionCreators } from '../../../slices/ratingSlice';
import { getItem } from '../../../lib/localStorageManager';

export const useFetchPoliticians = () => {
  const [status, setStatus] = useState<APIStatus>(APIStatus.Initial);
  // const { fetchRatingPoliticians } = ratingAPI();
  const { fetchRatingPoliticiansArray } = ratingAPI();
  const { setPoliticians, addPoliticians } = ratingActionCreators();
  const { sort_direction, sort_field, sort_vote, sort_geography } = useSelector((s: RootState) => s.rating);
  const token = getItem('token');

  const { country_politician_idArray, region_politician_idArray, city_politician_idArray } = sort_geography;
  const { country_user_idArray, region_user_idArray, city_user_idArray } = sort_vote;

  const fetch = useCallback((world, worldVotes, page = 1) => {
    setStatus(APIStatus.Loading);
    fetchRatingPoliticiansArray({
      onSuccess: (response) => {
        if (page > 1) {
          addPoliticians(response);
        } else {
          setPoliticians(response);
        }
        setStatus(APIStatus.Success);
      },
      onError: () => setStatus(APIStatus.Failure),
      payload: {
        token,
        page,
        orderBy: sort_direction,
        sortBy: sort_field,
        country_politician_id: country_politician_idArray,
        region_politician_id: region_politician_idArray,
        city_politician_id: city_politician_idArray,
        country_user_id: country_user_idArray,
        region_user_id: region_user_idArray,
        city_user_id: city_user_idArray,
        is_world_votes: worldVotes ? 1 : 0,
        is_world_politicians: world ? 1 : 0,
      },
    });
  }, [sort_direction, sort_field, token, city_politician_idArray, sort_geography, city_user_idArray, sort_vote]);

  // const fetch = useCallback((is_votes_world, page = 1) => {
  //   setStatus(APIStatus.Loading);
  //   fetchRatingPoliticians({
  //     onSuccess: (response) => {
  //       if (page > 1) {
  //         addPoliticians(response);
  //       } else {
  //         setPoliticians(response);
  //       }
  //       setStatus(APIStatus.Success);
  //     },
  //     onError: () => setStatus(APIStatus.Failure),
  //     payload: {
  //       token,
  //       params: {
  //         page,
  //         orderBy: sort_direction,
  //         sortBy: sort_field,
  //         country_politician_id,
  //         region_politician_id,
  //         city_politician_id,
  //         country_user_id,
  //         region_user_id,
  //         city_user_id,
  //         is_votes_world: is_votes_world ? 1 : null
  //       },
  //     },
  //   });
  // }, [sort_direction, sort_field, token, city_politician_id, sort_geography, city_user_id]);

  return { fetch, status };
};
