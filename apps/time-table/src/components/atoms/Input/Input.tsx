import React, { forwardRef } from 'react';
import { Input as ShadcnInput } from '@libs/shared/shadcn-ui/ui/components/ui/input';

import * as T from './Input.types';

const Input = forwardRef<HTMLInputElement, T.TInputProps>(
  ({ ...rest }, ref) => {
    return <ShadcnInput ref={ref} {...rest} />;
  },
);

export default Input;
