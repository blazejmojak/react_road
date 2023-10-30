import { useState, useEffect, ChangeEvent, useReducer } from 'react'
import './App.css'
import { useSearchField } from './customHooks/useSearchField';
import CustomInput from './components/CustomInput';
import StoriesList from './components/StoriesList';
import { storiesReducer } from './reducers/storiesReducer';

export type Story = {
  title: string;
  url: string;
  author: string;
  num_comments: number;
  points: number;
  objectID: number;
}

export type TonRemoveItem = (item: Story) => void;


const initialStories: Story[] = [
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
  {
    title: 'TypeScript',
    url: 'https://typescript.pro/',
    author: 'Janusz Kowalski',
    num_comments: 4,
    points: 9,
    objectID: 11,
  },

];

const getAsyncStories = (): Promise<{ data: { stories: Story[] } }> =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve({ data: { stories: initialStories } })
    }, 3000)
  )

function App() {
  const [searchText, setsearchText] = useSearchField('searchField', '');
  // const [stories, setstories] = useState<Story[]>([]);
  const [stories, dispatchStories] = useReducer(storiesReducer, []);
  const [isLoading, setisLoading] = useState(false);
  const [isError, setisError] = useState(false);

  useEffect(() => {
    setisLoading(true);

    getAsyncStories()
      .then(res => {
        // setstories(res.data.stories);
        dispatchStories({ type: 'SET_STORIES', payload: res.data.stories });
        setisLoading(false);
      }).catch((error) => {
        console.log(error);
        setisError(true);
      });
  }, [])

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
      {isError && <p>Some Data Loading Error...</p>}
      {isLoading ? 'Is Loading...' : <StoriesList stories={stories} onRemoveItem={handleRemoveStory} />}
    </>
  )
}

export default App
