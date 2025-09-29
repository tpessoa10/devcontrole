"use client"

import { api } from "@/lib/api";
import { CustomerProps } from "@/utils/customer.type";
import { TicketProps } from "@/utils/ticket.type";
import { useRouter } from "next/navigation";
import { FiCheckSquare, FiFile } from "react-icons/fi";

interface TicketItemProps{
    ticket: TicketProps
    customer: CustomerProps | null
}

export function TicketItem({ticket, customer}:TicketItemProps){
    const router = useRouter()

    async function handleChangeStatus(){
        try {
            const response = await api.patch('api/ticket',  {
                id:ticket.id
            })
            router.refresh()
        } catch (error) {
            console.log(error)
        }

    }

    return(
        <>
            <tr className="border-b-2 border-slate-200 h-16 last:border-b-0 bg-slate-100 hover:bg-gray-200 duration-300">
                <td className="text-left pl-1">{customer?.name}</td>
                <td className="text-left">{ticket.created_at?.toLocaleDateString("pt-br")}</td>
                <td className="text-left"><span className="bg-green-500 px-2 py-1 rounded">{ticket.status}</span></td>
                <td className="text-left">
                    <button className="mr-3">
                        <FiCheckSquare onClick={handleChangeStatus} size={24} color="#131313"/>
                    </button>
                    <button>
                        <FiFile size={24} color="#3b82f6"/>
                    </button>
                </td>
            </tr>
        </>
    )
}