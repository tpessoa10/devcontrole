"use client"

import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface InputProps{
    type:string;
    placeholder:string;
    name:string;
    register: UseFormRegister<any>
    error?: string;
    rules?:RegisterOptions;
}

export function Input({name, placeholder, register, type, error, rules}: InputProps){
    return(
        <>
            <input {...register(name, rules)} id={name} placeholder={placeholder} type={type} className="w-full border-2 rounded-md h-11 px-2"/>
            {error && <p className="text-red-500 my-1">{error}</p>}
        </>
    )
}