import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import FeaturedCarousel from '../components/shared/FeaturedCarousel';
import PostEditor from '../components/admin/PostEditor';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
    .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
    .add('with some emoji', () => (
        <Button onClick={action('clicked')}>
            <span role="img" aria-label="so cool">
                😀 😎 👍 💯
      </span>
        </Button>
    ));

storiesOf('Featured Carousel', module)
    .add('With Posts', () =>
        <FeaturedCarousel posts=
            {[
                {
                    Id: 1,
                    Images: ['https://bikeadvice.in/wp-content/uploads/2017/10/2018-Ninja-400-Pics-Lime-Green-Ebony-7-700x478.jpg'],
                    Title: 'My First Post',
                    Subtitle: 'A description...',
                    TimeCreated: 'Aug 22nd \'18 @ 3:32pm'
                },
                {
                    Id: 2,
                    Images: ['https://bikeadvice.in/wp-content/uploads/2017/10/2018-Ninja-400-Pics-Orange-Grey-Black-1-700x459.jpg'],
                    Title: 'My Second Post',
                    Subtitle: 'A better description...',
                    TimeCreated: 'Aug 23rd \'18 @ 5:55pm'
                },
                {
                    Id: 3,
                    Images: ['https://bikeadvice.in/wp-content/uploads/2017/10/2018-Ninja-400-Pics-Black-4-700x427.jpg'],
                    Title: 'My Third Post',
                    Subtitle: 'The best description...',
                    TimeCreated: 'Aug 24th \'18 @ 8:13am'
                }
            ]}
        />
    )

storiesOf('Post Editor', module)
    .add('Basic View', () =>
        <PostEditor />
    )