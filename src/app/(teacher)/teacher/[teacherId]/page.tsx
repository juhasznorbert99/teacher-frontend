import ManagerDetails from "@/components/manager/ManagerDetails";
import { z } from "zod";
import TeacherDetails from "@/components/teacher/TeacherDetails";

interface Params {
    params: {
        teacherId: string;
    };
}

const paramsSchema = z.object({
    teacherId: z.coerce.string(),
});
const apiURL = "http://localhost:8000/v1";


export default async function SpecificManager({ params }: Params) {
    // Ensure params are awaited
    const { teacherId } = await params; // Await params here

    // If you need to validate, do it here:
    paramsSchema.parse({ teacherId });

    return (
        <div className="">
            <TeacherDetails teacherId={teacherId} />
        </div>
    );
}
