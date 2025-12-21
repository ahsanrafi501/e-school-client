import React from "react";
import { useQuery } from "@tanstack/react-query";
import PopularCard from "../Home/PopularCard.jsx/PopularCard";
import UseAuth from "../../Hook/UseAuth";
import UseAxiosSecure from "../../Hook/UseAxiosSecure";

const MyEnrolledCourses = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();

  // Fetch enrolled courses
  const { data: enrolledCourses = [], isLoading } = useQuery({
    queryKey: ["myEnrolledCourse", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/my-enrolled-course?email=${user.email}`
      );
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  if (!enrolledCourses.length)
    return (
      <p className="text-center mt-10 text-gray-500">
        You have not enrolled in any course yet.
      </p>
    );

  return (
    <div className="max-w-7xl mx-auto my-7">
      <h2 className="text-4xl font-bold text-center mb-7">
        My Enrolled Courses
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
        {enrolledCourses.map((course) => (
          <PopularCard
            key={course.courseId} 
            d={{
              ...course,
              _id: course.courseId, // Pass courseId as _id for PopularCard
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default MyEnrolledCourses;
