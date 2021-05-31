import {
  SearchContainer,
  SearchDropdown,
  SearchDropDownItem,
} from '../styles/SearchStyles';
import { resetIdCounter, useCombobox } from 'downshift';
import gql from 'graphql-tag';
import { useLazyQuery } from '@apollo/client';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/router';

const SEARCH_PRODUCTS_QUERY = gql`
  query SEARCH_PRODUCTS_QUERY($searchTerm: String!) {
    searchTerms: allProducts(
      where: {
        OR: [
          { name_contains_i: $searchTerm }
          { description_contains_i: $searchTerm }
        ]
      }
    ) {
      id
      name
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const Search = () => {
  const router = useRouter();
  const [findItems, { loading, data, error }] = useLazyQuery(
    SEARCH_PRODUCTS_QUERY,
    {
      // go directly to the network, i don't need to store all values in cache
      fetchPolicy: 'no-cache',
    }
  );
  const items = data?.searchTerms || [];
  // debounce function-in our case if input change so quickly we perform a lot of network requests
  // we need to find a way to avoid all of multiple requests
  const findItemsButChill = debounce(findItems, 350);

  resetIdCounter(); // fix some errors in console provided by downshift
  const {
    inputValue,
    highlightedIndex,
    isOpen,
    getItemProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
  } = useCombobox({
    items,
    onInputValueChange() {
      findItemsButChill({
        variables: {
          searchTerm: inputValue,
        },
      });
    },
    onSelectedItemChange({ selectedItem }) {
      // console.log('Selected item change!');
      router.push(`/product/${selectedItem.id}`);
    },
    itemToString: (item) => item?.name || '',
  });

  return (
    <SearchContainer>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            type: 'search',
            placeholder: 'Search for an item',
            id: 'search',
            className: loading ? 'loading' : '',
          })}
        />
      </div>
      <SearchDropdown {...getMenuProps()}>
        {isOpen &&
          items.map((item, index) => (
            <SearchDropDownItem
              key={item.id}
              {...getItemProps({ item, index })}
              highlighted={index === highlightedIndex}
            >
              <img
                src={item.photo.image.publicUrlTransformed}
                alt={item.name}
                width="50"
              />
              {item.name}
            </SearchDropDownItem>
          ))}

        {isOpen && !items.length && !loading && (
          <SearchDropDownItem>
            Sorry, no items found for&nbsp;<strong> {inputValue}</strong> 😢
          </SearchDropDownItem>
        )}
      </SearchDropdown>
    </SearchContainer>
  );
};

export default Search;
