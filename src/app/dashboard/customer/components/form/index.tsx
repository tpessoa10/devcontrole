"use client"

import { useForm } from 'react-hook-form'
import { email, z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/input'
import { api } from '@/lib/api'
import { useRouter } from 'next/navigation'

const schema = z.object({
    name: z.string().min(1, "O campo nome é obrigatório"),
    email: z.string().email("Digite um email valido").min(1, "O email é obrigatorio"),
    phone: z.string().refine((value) => {
        return /^\(\d{2}\)\s\d{9}$/.test(value) || /^\d{2}\s\d{9}$/.test(value) || /^\d{11}$/.test(value)
    }, {
        message: "Número de telefone deve ser (DD) 999999999"
    }),
    address: z.string()
})

type FormData = z.infer<typeof schema>

export function NewCostumerForm({ userId }: { userId: string }) {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema)
    })
    const router = useRouter()

    async function handleRegisterCostumer(data: FormData) {
        await api.post("/api/customer", {
            name: data.name,
            phone: data.email,
            email: data.email,
            address: data.address,
            userId: userId
        })
        console.log('data', data)

        router.replace("/dashboard/customer")

    }

    return (
        <form className='flex flex-col mt-6' onSubmit={handleSubmit(handleRegisterCostumer)}>
            <label className='mb-1 text-lg font-medium' htmlFor="">Nome Completo</label>
            <Input type='text' name='name' placeholder='Digite o nome completo' error={errors.name?.message} register={register} />
            <section className='flex flex-col gap-2 my-2 sm:flex-row'>
                <div className='flex-1'>
                    <label className='mb-1 text-lg font-medium' htmlFor="">Telefone</label>
                    <Input type='number' name='phone' placeholder='Digite o telefone' error={errors.phone?.message} register={register} />
                </div>
                <div className='flex-1'>
                    <label className='mb-1 text-lg font-medium' htmlFor="">Email</label>
                    <Input type='email' name='email' placeholder='Digite o email' error={errors.email?.message} register={register} />
                </div>
            </section>
            <label className='mb-1 text-lg font-medium' htmlFor="">Endereço Completo</label>
            <Input type='text' name='address' placeholder='Digite o endereço do cliente' error={errors.address?.message} register={register} />
            <button className='bg-blue-500 my-4 px-2 h-11 cursor-pointer rounded text-white font-bold' type='submit'>
                Cadastrar
            </button>
        </form>
    )
}