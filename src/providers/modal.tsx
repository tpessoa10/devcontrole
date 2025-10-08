"use client"

import { createContext, ReactNode, useState} from 'react'
import { TicketProps } from '@/utils/ticket.type'
import { ModalTicket } from '@/components/modal';
import { CustomerProps } from '@/utils/customer.type';
import { Ticket } from '@prisma/client';

interface ModalContextData{
    visible: boolean;
    handleModalVisible:() => void;
    ticket: TicketInfo | undefined;
    setDetailTicket: (detail: TicketInfo) => void;
}

interface TicketInfo{
    ticket:TicketProps;
    customer:CustomerProps;
}

export const ModalContext = createContext({} as ModalContextData)

export const ModalProvider = ({children}: {children:ReactNode}) => {
    const [visible, setVisible] = useState(false)
    const [ticket, setTicket] = useState<TicketInfo>()

    function handleModalVisible(){
        setVisible(!visible)
    }

    function setDetailTicket(detail: TicketInfo){
        setTicket(detail)
    }
    return(
        <ModalContext.Provider value={{ visible, handleModalVisible, setDetailTicket, ticket}}>
            {visible && (
                <ModalTicket/>
            )}
            {children}
        </ModalContext.Provider>
    )
} 