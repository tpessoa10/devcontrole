import { NextResponse } from "next/server";
import {getServerSession} from "next-auth";
import { authOptions } from "@/lib/auth";
import  prismaClient from '@/lib/prisma'

export async function PATCH(request:Request) {
    const session = await getServerSession(authOptions)

    if(!session || !session.user){
        return NextResponse.json({error: "Not Authorized", status:401})
    }

    const { id } = await request.json()

    const findTicket = await prismaClient.ticket.findFirst({
        where:{
            id: id as string
        }
    })

    if(!findTicket){
        NextResponse.json({Message:"Failed update ticket", status:400})
    }

    try {
        await prismaClient.ticket.update({
            where:{
                id: id
            },
            data:{
                status:"fechado"
            }
        })
        return NextResponse.json({message:"Chamado atualizado"})
    } catch (error) {
        NextResponse.json({Message:"Failed update ticket", status:400})
    }
}

export async function POST(request:Request){
    const {customerId, name, description} = await request.json()

    if(!customerId || !name || !description){
        return NextResponse.json({error:"Failed to create new ticker", status:400})
    }

    try {
        await prismaClient.ticket.create({
            data:{
                name: name,
                description: description,
                status:"aberto",
                customerId: customerId
            }
        })

        return NextResponse.json({message:"Chamado registrado com sucesso"})
    } catch (error) {
        return NextResponse.json({error:"Failed to create new ticker", status:400})
    }
}