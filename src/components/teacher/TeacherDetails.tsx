"use client";
import { useEffect, useState } from "react";

const apiURL = "http://localhost:8000/v1";

interface Teacher {
  name: string;
  email: string;
  subject: string;
  description: string;
  hourly_rate: number;
  availability: string;
}

interface TeacherDetailsProps {
  teacherId: string;
}

export default function TeacherDetails({ teacherId }: TeacherDetailsProps) {
  const [teacher, setTeacher] = useState<Teacher | null>(null);

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const response = await fetch(`${apiURL}/teacher/${teacherId}`);
        console.log("Raw Response:", response);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Parsed Data:", data);
        setTeacher(data);
      } catch (error) {
        console.error("Error fetching teacher:", error);
      }
    };

    fetchTeacher();
  }, [teacherId]);

  if (!teacher) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mt-16  mx-auto p-4 bg-white shadow-lg rounded-lg">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <img
            className="h-16 w-16 rounded-full"
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            alt="Teacher Profile"
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{teacher.name}</h2>
          <p className="text-gray-600">{teacher.email}</p>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-900">Profile Details</h3>
        <div className="mt-4 space-y-2">
          <p className="text-gray-700"><span className="font-semibold">Subject:</span> {teacher.subject}</p>
          <p className="text-gray-700"><span className="font-semibold">Description:</span> {teacher.description}</p>
          <p className="text-gray-700"><span className="font-semibold">Hourly Rate:</span> ${teacher.hourly_rate}</p>
          <p className="text-gray-700"><span className="font-semibold">Availability:</span> {teacher.availability}</p>
        </div>
      </div>
    </div>
  );
}
