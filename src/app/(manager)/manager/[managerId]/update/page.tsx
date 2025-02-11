import UpdateManager from "@/components/manager/UpdateManager";
import ManagerDetails from "@/components/manager/ManagerDetails";
import { z } from "zod";

interface Params {
    params: {
        managerId: string;
    };
}

const paramsSchema = z.object({
    managerId: z.coerce.string(),
});
const apiURL = "http://localhost:8000/v1";


export default async function UpdateSpecificManager({ params }: Params) {
    // Ensure params are awaited
    const { managerId } = await params; // Await params here

    // If you need to validate, do it here:
    paramsSchema.parse({ managerId });

    return (
        <div className="">
            <p>Update manager: {managerId}</p>
            <UpdateManager managerId={managerId} />
        </div>
    );
}
