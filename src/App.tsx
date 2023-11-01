import { useEffect, ChangeEvent, useReducer, useCallback, useState, FormEvent } from 'react'
import axios from 'axios'
import './App.css'
import { useSearchField } from './customHooks/useSearchField';
import StoriesList from './components/StoriesList';
import { storiesReducer } from './reducers/storiesReducer';
import SearchForm from './components/SearchForm';

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

export type Story = {
  title: string;
  url: string;
  author: string;
  num_comments: number;
  points: number;
  objectID: number;
}

export type StoriesState = {
  isLoading: boolean;
  isError: boolean;
  data: Story[];
}

export type TonRemoveItem = (item: Story) => void;

// const getAsyncStories = (): Promise<{ data: { stories: Story[] } }> =>
//   new Promise((resolve) =>
//     setTimeout(() => {
//       resolve({ data: { stories: initialStories } })
//     }, 3000)
//   )

function App() {
  // const [stories, setstories] = useState<Story[]>([]);
  const [stories, dispatchStories] = useReducer(storiesReducer, { data: [], isLoading: false, isError: false });
  const [searchText, setsearchText] = useSearchField('searchField', '');

  const [url, setUrl] = useState(
    `${API_ENDPOINT}${searchText}`
  );

  const handleFetchStories = useCallback(async () => {

    dispatchStories({ type: 'STORIES_FETCH_INIT' });

    try {
      const result = await axios.get(url);

      dispatchStories({
        type: 'STORIES_FETCH_SUCCESS',
        payload: result.data.hits,
      })
    } catch (error) {
      dispatchStories({ type: 'STORIES_FETCH_FAILURE' });
    }

  }, [url])

  useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories])

  const handleRemoveStory: TonRemoveItem = (item: Story) => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    });
  }


  const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    setsearchText(event.target.value);
  };

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    setUrl(`${API_ENDPOINT}${searchText}`);

    event.preventDefault();
  };


  return (
    <>
      <SearchForm searchText={searchText} handleSearchInput={handleSearchInput} handleSearchSubmit={handleSearchSubmit} />
      <p>
        <strong>Search Field value is: {searchText}</strong>
      </p>
      {stories.isError && <p>Some Data Loading Error...</p>}
      {stories.isLoading ? 'Is Loading...' : <StoriesList stories={stories.data} onRemoveItem={handleRemoveStory} />}
    </>
  )
}

export default App
