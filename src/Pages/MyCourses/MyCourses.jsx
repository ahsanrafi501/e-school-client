import React from "react";
import { motion } from "motion/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import UseAuth from "../../Hook/UseAuth";
import useAxiosSecure from "../../Hook/UseAxiosSecure";
import { Link } from "react-router";
import Swal from "sweetalert2";

const MyCourses = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const {
    data: courses = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["myCourses", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-courses?email=${user.email}`,{
        headers: {
          authorization: `Brearer ${user.accessToken}`
        }
      });
      return res.data;
    },
  });

  const handleDelete = async (courseId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This course will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/courses/${courseId}`);
        Swal.fire({
          icon: "success",
          title: "Course deleted successfully",
          timer: 1500,
          showConfirmButton: false,
        });
        // Refresh the query to remove deleted course from the list
        queryClient.invalidateQueries(["myCourses", user?.email]);
      } catch (error) {
        Swal.fire({ icon: "error", title: "Failed to delete course" });
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (isError) {
    return <p className="text-center text-red-500">Failed to load courses</p>;
  }

  return (
    <div className="min-h-screen bg-base-200 px-6 py-10">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center mb-10"
      >
        My Courses
      </motion.h2>

      {courses.length === 0 ? (
        <p className="text-center text-gray-500">
          You haven’t added any courses yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <motion.div
              key={course._id}
              whileHover={{ scale: 1.05 }}
              className="card bg-base-100 shadow-xl"
            >
              <figure>
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="h-52 w-full object-cover"
                />
              </figure>

              <div className="card-body">
                <h2 className="card-title">{course.title}</h2>

                <p className="text-sm text-gray-500 line-clamp-2">
                  {course.description}
                </p>

                <div className="flex justify-between text-sm mt-2">
                  <span>💰 ৳{course.price}</span>
                  <span>⏱ {course.duration}</span>
                </div>

                <div className="flex justify-between text-sm mt-2">
                  <span>⭐ {course.rating || 0}</span>
                  <span>👥 {course.enrolled || 0}</span>
                </div>

                <div className="card-actions justify-between mt-4">
                  <Link
                    to={`/edit-course/${course._id}`}
                    className="btn btn-outline btn-sm"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(course._id)}
                    className="btn btn-error btn-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCourses;
