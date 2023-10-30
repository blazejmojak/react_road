import { Story, TonRemoveItem } from "../App";

type Props = {
  story: Story;
  onRemoveItem: TonRemoveItem;
}

const StoryItem = ({ story, onRemoveItem }: Props) => {
  return (
    <>
      <p>{story.title} <button onClick={() => onRemoveItem(story)}>Remove</button> </p>
    </>
  )
}

export default StoryItem