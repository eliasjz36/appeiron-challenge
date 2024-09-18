import * as React from 'react';

import { useDebouncedCallback } from 'use-debounce';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  debounce?: boolean;
  debounceTime?: number;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, onChange, debounce, debounceTime = 500, ...props },
    ref,
  ) => {
    const [localValue, setLocalValue] = React.useState<string | undefined>(
      props.value?.toString(),
    );

    const debouncedOnChange = useDebouncedCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) onChange(event);
      },
      debounceTime ?? 0,
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setLocalValue(e.target.value);
      if (debounce) {
        debouncedOnChange(e);
      } else if (onChange) {
        onChange(e);
      }
    };

    return (
      <input
        type={type}
        className={cn(
          'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
        onChange={handleChange}
        value={debounce ? localValue : props.value}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };
