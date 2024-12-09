import { join } from 'path';
import { createGlobPatternsForDependencies } from '@nx/react/tailwind';
import CommonTailwindConfig from '../../libs/shared/shadcn-ui/util/src/tailwind/tailwind.config.mjs';

import type { Config } from 'tailwindcss';

const config: Config = {
  ...CommonTailwindConfig,
  content: [
    ...(Array.isArray(CommonTailwindConfig.content)
      ? CommonTailwindConfig.content
      : []),
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx}',
    ),
    join(__dirname, './*.html'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
};

export default config;
