import {act, create} from 'react-test-renderer';
import TuitStats from "../components/tuits/tuit-stats";

test('stats render correctly', () => {
    let stats = {replies: 234, retuits: 345, likes: 123, dislikes: 124 }
    let tuitStats
    act(() => {
        tuitStats = create(
            <TuitStats likeTuit={() => {}} dislikeTuit={() => {}} tuit={{stats: stats}}/>
        )
    })

   const root = tuitStats.root;
   const likesCounter = root.findByProps(
   {className: 'ttr-stats-likes'})
   const dislikesCounter = root.findByProps(
   {className: 'ttr-stats-dislikes'})
   const retuitsCounter = root.findByProps(
   {className: 'ttr-stats-retuits'})
   const repliesCounter = root.findByProps(
   {className: 'ttr-stats-replies'})


   let likesText = likesCounter.children[0];
   const repliesText = repliesCounter.children[0];
   const retuitsText = retuitsCounter.children[0];
   let dislikesText = dislikesCounter.children[0];

   expect(likesText).toBe('123');
   expect(repliesText).toBe('234');
   expect(retuitsText).toBe('345');
   expect(dislikesText).toBe('124');


 })
