"use client";
import { useEffect, useState } from "react";

const apiURL = "http://localhost:8000/v1";

interface ManagerDetailsProps {
    managerId: string;
}

export default function ManagerDetails({ managerId }: ManagerDetailsProps) {
    const [manager, setManager] = useState<{ name: string } | null>(null);

    useEffect(() => {
        const fetchManager = async () => {
            try {
                const response = await fetch(`${apiURL}/manager/${managerId}`);
                console.log("Raw Response:", response);
    
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
    
                const data = await response.json();
                console.log("Parsed Data:", data);
                setManager(data);
            } catch (error) {
                console.error("Error fetching manager:", error);
            }
        };
    
        fetchManager();
    }, [managerId]);
    

    if (!manager) return <div>Loading...</div>;

    return (
        <div>
            Name: {manager.name}
        </div>
    );
}
