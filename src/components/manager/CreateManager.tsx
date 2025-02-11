"use client"; // Ensure this runs in the client

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Define validation schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  hotel_id: z.string().uuid("Invalid hotel ID").optional(), // Make hotel_id optional
});

// Infer TypeScript type from schema
type FormData = z.infer<typeof formSchema>;
const apiURL = "http://localhost:8000/v1";

export default function ManagerForm() {
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
          hotel_id: data.hotel_id,
      };
      const response = await fetch(`${apiURL}/manager`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(manager),
      });

      if (!response.ok) throw new Error("Failed to submit form");

      alert("Manager added successfully!");
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

      {/* Hotel ID Field */}
      <div>
        <label className="block font-medium">Hotel ID</label>
        <input {...register("hotel_id")} className="border p-2 w-full rounded-md" />
        {errors.hotel_id && <p className="text-red-500">{errors.hotel_id.message}</p>}
      </div>

      {/* Submit Button */}
      <button type="submit" disabled={isSubmitting} className="bg-blue-500 text-white px-4 py-2 rounded-md w-full">
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}