import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { NOTIFICATION_IMG_1, SEARCH_ICON } from '../../assets/images';
import { useDebounce } from '../../hooks';
import { getGlobalSearchAction, resetGlobalSearchData } from '../../store/sagaActions';
import { generateURL, RenderIf } from '../../utils';
import NoDataFound from '../Cards/NoDataCard/NoDataCard';
import Spinner from '../spinner';

import './search.css';

const Search = ({ className = '' }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const dispatch = useDispatch();
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { searchData, isLoading } = useSelector((state) => state.search);

  useEffect(() => {
    if (debouncedSearchTerm?.length >= 2)
      dispatch(getGlobalSearchAction({ URL: generateURL({ text: debouncedSearchTerm }) }));
    else dispatch(resetGlobalSearchData());
  }, [debouncedSearchTerm]);

  return (
    <div className="position-relative w-100 mb-lg-0 mb-3">
      <div className={`position-relative ${className}`}>
        <input
          type="search"
          placeholder="Search"
          className="header-search-input"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img src={SEARCH_ICON} alt="search" className="header-search-icon" />
      </div>

      <RenderIf isTrue={searchData?.nft || isLoading}>
        <div className="search-dropdown-container">
          <ul className="search-dropdown-list-container">
            <RenderIf isTrue={isLoading}>
              <Spinner className="pt-2 pb-2" />
            </RenderIf>

            <RenderIf isTrue={!isLoading}>
              <RenderIf isTrue={!searchData?.nft?.length}>
                <NoDataFound text="No NFT found" className="text-light" height={100} />
              </RenderIf>

              <RenderIf isTrue={searchData?.nft}>
                {searchData?.nft?.slice(0, 4)?.map((item) => (
                  <li className="search-dropdown-list" key={item._id}>
                    <Link
                      to={`/nft-detail/${item.id}/${item?.multipleOwners[0]?._id}`}
                      className="search-list-data-container d-flex align-items-center ">
                      <img
                        src={item?.previewImage || NOTIFICATION_IMG_1}
                        className="search-dropdown-list-img"
                        alt="notification-img"
                      />
                      <p className="search-dropdown-list-data">{item?.title ?? 'N/A'}</p>
                    </Link>
                  </li>
                ))}
              </RenderIf>
            </RenderIf>
          </ul>
        </div>
      </RenderIf>
    </div>
  );
};

export default Search;
