import { SearchIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

import { Input } from './input'

interface SearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
	value: string | undefined
	onValueChange: (value: string) => void
	placeholder?: string
	className?: string
	debounce?: boolean
	debounceTime?: number
}

export function Search({
	value,
	onValueChange,
	placeholder = 'Buscar...',
	className = '',
	...props
}: SearchProps) {
	return (
		<div className='relative'>
			<SearchIcon className='absolute left-2 top-2 h-4 w-4 text-muted-foreground' />
			<Input
				type='search'
				placeholder={placeholder}
				className={cn('h-8 w-[150px] pl-8 lg:w-[250px]', className)}
				value={value}
				onChange={props.onChange ?? ((e) => onValueChange(e.target.value))}
				{...props}
			/>
		</div>
	)
}
