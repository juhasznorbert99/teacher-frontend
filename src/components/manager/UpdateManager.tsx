"use client";

import { useEffect, useState } from "react";

const apiURL = "http://localhost:8000/v1";

interface UpdateManagerProps {
    managerId: string;
}

export default function UpdateManager({ managerId }: UpdateManagerProps) {
    const [manager, setManager] = useState<{ email: string } | null>(null);
    const [newEmail, setNewEmail] = useState<string>("");

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
                setNewEmail(data.email);
            } catch (error) {
                console.error("Error fetching manager:", error);
            }
        };

        fetchManager();
    }, [managerId]);

    const handleUpdate = async () => {
        try {
            const response = await fetch(`${apiURL}/manager/${managerId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: newEmail }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Updated Data:", data);
            setManager(data);
        } catch (error) {
            console.error("Error updating manager:", error);
        }
    };

    if (!manager) return <div>Loading...</div>;

    return (
        <div>
            <div>
                Email: <input value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
            </div>
            <button onClick={handleUpdate}>Update</button>
        </div>
    );
}