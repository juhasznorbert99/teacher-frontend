import Image from "next/image";
import CreateManager from "@/components/manager/CreateManager";
import CreateTeacher from "@/components/teacher/CreateTeacher";

export default function CreateManagerForm() {
  return (
    <div className="">
            <div className="flex flex-col justify-center items-center bg-white p-6 rounded-lg">
        <p className="text-2xl font-bold text-gray-800 mb-2">New Teacher</p>
        <p className="text-gray-600">Fill the form</p>
      </div>
      
      <CreateTeacher />
    </div>
  );
}
