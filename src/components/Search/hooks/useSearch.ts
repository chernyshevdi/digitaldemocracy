import { useState } from 'react';
import { APIStatus } from 'src/lib/axiosAPI';
import { searchAPI } from 'src/api/searchAPI';
import { searchActionCreators } from 'src/slices/searchSlice';

export const useSearch = () => {
  const [status, setStatus] = useState<APIStatus>(APIStatus.Initial);
  // const searchParams = useSelector(searchSelectors.getSearchQuery());
  const {
    setSearchData
  } = searchActionCreators();
  const { fetchSearch } = searchAPI();

  const fetchSearchCategories = ({
    search,
    isNews = true,
    isPolitician = true,
    isParty = true,
    isMedia = true,
    isAuthor = true,
    page = 1,
    perPage = 4
  }) => {
    setStatus(APIStatus.Loading);
    const paramAPI = {
      search,
      isNews,
      isPolitician,
      isParty,
      isMedia,
      isAuthor,
      page,
      perPage
    };
    fetchSearch({
      onError: () => {
        setStatus(APIStatus.Failure);
      },
      onSuccess: (response) => {
        setSearchData(response);
        setStatus(APIStatus.Success);
      },
      payload: paramAPI
    });
  };

  return { status, fetchSearchCategories };
};
