import { initialize, mswLoader } from 'msw-storybook-addon'
import { handlers } from '@TimeTable/libs/msw/handlers';

import '@TimeTable/global.css';


// INFO: Initialize MSW
initialize({
    // INFO: bypass unhandled requests and not do anything
  onUnhandledRequest: 'bypass',
})

const preview = {
  // INFO: Provide the MSW addon loader globally
  parameters: {
    msw: {
      handlers: handlers(),
    },
  },
  loaders: [mswLoader],
}

export default preview