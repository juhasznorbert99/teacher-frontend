"use client"; // Ensure this runs in the client

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// import { useRouter } from "next/router";

// Define validation schema
const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email"),
    subject: z.string().min(2, "Subject must be at least 2 characters"),
    description: z.string().min(2, "Description must be at least 2 characters"),
    hourly_rate: z.string(),
    availability: z.string().min(2, "Availability must be at least 2 characters"),
});

// Infer TypeScript type from schema
type FormData = z.infer<typeof formSchema>;
const apiURL = "http://localhost:8000/v1";

export default function TeacherForm() {
    // const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  // Handle form submission
  async function onSubmit(data: FormData) {
    try {
      console.log("Data:", data);
      let manager = {
            email: data.email,
            name: data.name,
            subject: data.subject,
            description: data.description,
            hourly_rate: data.hourly_rate,
            availability: data.availability
      };
      const response = await fetch(`${apiURL}/teacher`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(manager),
      });

      if (!response.ok) throw new Error("Failed to submit form");
      const result = await response.json();
    //   router.push(`/teacher/${result.id}`);
    //   alert("Teacher added successfully!");
        window.location.href = `/teacher/${result.id}`; // Redirect to the teacher's page
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto p-4 border rounded-md shadow-md">
      {/* Name Field */}
      <div>
        <label className="block font-medium">Name</label>
        <input {...register("name")} className="border p-2 w-full rounded-md" />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      {/* Email Field */}
      <div>
        <label className="block font-medium">Email</label>
        <input {...register("email")} className="border p-2 w-full rounded-md" />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      {/* Subject Dropdown */}
      <div>
        <label className="block font-medium">Subject</label>
        <select {...register("subject")} className="border p-2 w-full rounded-md">
          <option value="Math">Math</option>
          <option value="English">English</option>
          <option value="Physics">Physics</option>
        </select>
        {errors.subject && <p className="text-red-500">{errors.subject.message}</p>}
      </div>

      {/* Hotel ID Field */}
      <div>
        <label className="block font-medium">Description</label>
        <input {...register("description")} className="border p-2 w-full rounded-md" />
        {errors.description && <p className="text-red-500">{errors.description.message}</p>}
      </div>
      

      {/* Hotel ID Field */}
      <div>
        <label className="block font-medium">HourlyRate</label>
        <input {...register("hourly_rate")} className="border p-2 w-full rounded-md" />
        {errors.hourly_rate && <p className="text-red-500">{errors.hourly_rate.message}</p>}
      </div>

      

      {/* Hotel ID Field */}
      <div>
        <label className="block font-medium">Availability</label>
        <input {...register("availability")} className="border p-2 w-full rounded-md" />
        {errors.availability && <p className="text-red-500">{errors.availability.message}</p>}
      </div>

      {/* Submit Button */}
      <button type="submit" disabled={isSubmitting} className="bg-blue-500 text-white px-4 py-2 rounded-md w-full">
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}