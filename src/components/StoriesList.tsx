import { TonRemoveItem, Story } from '../App'
import StoryItem from './StoryItem'


type Props = {
    stories: Story[];
    onRemoveItem: TonRemoveItem;
}

const StoriesList: React.FC<Props> = ({ stories, onRemoveItem }: Props) => {
    return (
        <>
            {stories.map((story: Story) => (
                <StoryItem key={story.objectID} story={story} onRemoveItem={onRemoveItem} />
            ))}
        </>
    )
}

export default StoriesList