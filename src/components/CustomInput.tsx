import { ChangeEvent, ReactNode, useEffect, useRef } from 'react'

type Props = {
    id: string,
    type: string,
    value: string;
    isFocused: boolean;
    changeSearchState: (event: ChangeEvent<HTMLInputElement>) => void;
    children: ReactNode;
}

const CustomInput = ({ id, type, value, isFocused, changeSearchState, children }: Props) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (isFocused && inputRef.current) {
        inputRef.current.focus();
        console.log(inputRef.current);
      }
    }, [isFocused])
    
    return (
        <>
            <label htmlFor={id}>{children}</label>
            <input id={id} ref={inputRef} type={type} value={value} onChange={(event => changeSearchState(event))} />
        </>
    )
}

export default CustomInput