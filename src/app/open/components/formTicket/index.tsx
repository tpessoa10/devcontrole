"use client"

import {Input} from '@/components/input'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { api } from '@/lib/api'
import {CustomerDataInfo} from '../../page'

interface FormTicketProps{
    customer: CustomerDataInfo
}

const schema = z.object({
    name: z.string().min(1, "Nome do chamado obrigatório"),
    description: z.string().min(1, 'Descreva seu problema')
})

type formData = z.infer<typeof schema>

export function FormTicket({customer}:FormTicketProps){
    const { register, handleSubmit, setValue, formState:{errors}} = useForm<formData>({
        resolver: zodResolver(schema)
    })

    async function handleRegisterTicket(data: formData){
        const response = await api.post('/api/ticket', {
            name: data.name,
            description: data.description,
            customerId: customer.id
        })

        setValue("name", "")
        setValue("description", "")
    }
    return(
        <form onSubmit={handleSubmit(handleRegisterTicket)} className='bg-slate-200 mt-6 px-4 py-6 rounded border-2'>
            <label className='mb-1 font-medium text-lg'>
                Nome do chamado
            </label>
            <Input register={register} type='text' placeholder='Digite o nome do chamado' name='name' error={errors.name?.message}/>
            <label className='mb-1 font-medium text-lg'>
                Nome o problema
            </label>
            <textarea {...register("description")} className='w-full border-2 rounded-md h-24 resize-none mb-2 px-2' placeholder='Descreva o seu problema' id='descreption'/>
            {errors.description?.message && (
                <p>{errors.description.message}</p>
            )}
            <button type='submit' className='bg-blue-500 rounded-md w-full h-11 px-2 text-white font-bold'>

            </button>
        </form>
    )
}