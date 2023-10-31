import { useEffect, ChangeEvent, useReducer, useCallback } from 'react'
import './App.css'
import { useSearchField } from './customHooks/useSearchField';
import CustomInput from './components/CustomInput';
import StoriesList from './components/StoriesList';
import { storiesReducer } from './reducers/storiesReducer';

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
  const [searchText, setsearchText] = useSearchField('searchField', '');
  // const [stories, setstories] = useState<Story[]>([]);
  const [stories, dispatchStories] = useReducer(storiesReducer, { data: [], isLoading: false, isError: false });

  const handleFetchStories = useCallback(() => {
    if (!searchText) return;

    dispatchStories({ type: 'STORIES_FETCH_INIT' });

    fetch(`${API_ENDPOINT}${searchText}`)
      .then((response) => response.json())
      .then((result) => {
        dispatchStories({
          type: 'STORIES_FETCH_SUCCESS',
          payload: result.hits,
        })
      });
  }, [searchText])

  useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories])

  const handleRemoveStory: TonRemoveItem = (item: Story) => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    });
  }


  const changeSearchState = (event: ChangeEvent<HTMLInputElement>) => {
    setsearchText(event.target.value)
  }


  return (
    <>
      <CustomInput id="searchField" type="text" value={searchText} isFocused={true} changeSearchState={changeSearchState}>
        <strong>Type something:</strong>
      </CustomInput>
      <p>
        <strong>Search Field value is: {searchText}</strong>
      </p>
      {stories.isError && <p>Some Data Loading Error...</p>}
      {stories.isLoading ? 'Is Loading...' : <StoriesList stories={stories.data} onRemoveItem={handleRemoveStory} />}
    </>
  )
}

export default App
