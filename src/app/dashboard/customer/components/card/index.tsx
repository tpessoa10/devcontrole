"use client"

import { api } from '@/lib/api'
import { CustomerProps } from '@/utils/customer.type'
import { id } from 'zod/locales'

export function CardCustomer({customer}: {customer: CustomerProps}){
    
    async function handleDeleteCustomer() {
        try{
            const response = await api.delete("/api/customer", {
            params:{
                id: customer.id
            }
        })
        } catch(err){
            console.log(err)
        }
    }

    return(
        <article className="flex flex-col bg-gray-100 border-2 p-2 rounded-lg gap-2 hover:slace-105 duration-300">
            <h2><a className="font-bold" href="">Nome</a>: {customer?.name}</h2>
            <p className="font-bold" >Email: {customer?.email}</p>
            <p className="font-bold" >Telefone: {customer?.phone}</p>
            <button onClick={handleDeleteCustomer} className="bg-red-500 px-4 rounded text-white mt-2 self-start">
                Deletar
            </button>
        </article>    
    )
}