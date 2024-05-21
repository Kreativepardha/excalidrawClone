import { ChangeEvent } from "react"


interface InputProps{

    type:string,
    placeholder:string,
    label:string,
    name?:string,
    value?:string
    error?:boolean
    classname:string,
    onChange?:(e: ChangeEvent<HTMLInputElement>) => void
}


export const InputBox: React.FC<InputProps> =  ({
type,placeholder,label,name,value,error,onChange,classname
}) => {

    return (
        <div className="mb-4 " >
            <label htmlFor={name}  className="block text-sm font-medium font-extrabold border-b-4 border-l-4 pl-1 border-teal-300  mb-1" >{label}</label>
           <div className="border-teal-400 border-r-4 border-b-4 p-2">

            <input 
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={`w-full p-2 border ${error ? 'border-red-500' : 'border-gray-900 border-r-2 border-b-2'} rounded-md text-black   `}
                    />
                { error && <span    className="text-red-500 text-sm mt-1" >Error: Invalid input</span>  }
                    </div>
        </div>
    )

}
export default InputBox;