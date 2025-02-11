import Image from "next/image";
import CreateManager from "@/components/manager/CreateManager";

export default function CreateManagerForm() {
  return (
    <div className="">
      <div className="">
        <p>New manager</p>
        <p>Fill the form</p>
      </div>
      
      <CreateManager />
    </div>
  );
}
