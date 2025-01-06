import { Button as ShadcnButton } from '@libs/shared/shadcn-ui/ui/components/ui/button';

import * as T from './Button.types';

function Button({ ...rest }: T.TButtonProps) {
  return <ShadcnButton {...rest} />;
}

export default Button;
