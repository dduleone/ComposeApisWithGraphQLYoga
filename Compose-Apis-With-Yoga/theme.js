// export {code as theme} from 'mdx-deck/themes';
import {code} from 'mdx-deck/themes';

import prismGraphql from 'react-syntax-highlighter/languages/prism/graphql'
import twilight from 'react-syntax-highlighter/styles/prism/twilight'

// import theme from 'mdx-deck/themes'

// export default {
//   ...theme,

//   // Customize your presentation theme here.
//   //
//   // Read the docs for more info:
//   // https://github.com/jxnblk/mdx-deck/blob/master/docs/theming.md
//   // https://github.com/jxnblk/mdx-deck/blob/master/docs/themes.md

// }


export const theme = {
    ...code,
    prism: {
        style: twilight,
        languages: {
            graphql: prismGraphql
        }
    }
};