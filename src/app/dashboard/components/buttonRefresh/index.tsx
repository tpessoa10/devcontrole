"use client"

import { useRouter } from "next/navigation" 
import { FiRefreshCcw } from "react-icons/fi"

export function ButtonRefresh(){
    const router = useRouter()
    return(
        <button className="bg-gray-600 px-4 py-1 rounded">
            <FiRefreshCcw onClick={() => router.refresh()} size={24} color="#fff"/>
        </button>
    )
}