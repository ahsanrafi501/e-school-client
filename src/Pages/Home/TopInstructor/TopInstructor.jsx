
import React, { use } from "react";
import { motion } from "motion/react";
import UseAuth from "../../../Hook/UseAuth";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hook/UseAxiosSecure";

// You would typically pass the instructor data as props
const TopInstructor = () => {

  const {user} = UseAuth();
  const axiosSecure = UseAxiosSecure()
  const {data: instructorData = []} = useQuery({
    queryKey:['topInstructor', user],
    queryFn: async () =>{
      const res = await axiosSecure.get('/topInstructors')
      return res.data;
    }
  })

  console.log(instructorData);

  return (
    <div  className="max-w-7xl mx-auto my-5">
        <h2 className="text-5xl text-[#2F327D] font-bold text-center my-5">Top Instructor</h2>


    <div className="grid grid-cols-1 place-items-center sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {instructorData.sort((a,b) => (b.rating) - a.rating).map((data) => (
        <motion.div whileHover={{ scale: 1.1 }} className="card w-72 bg-base-100 shadow-xl border border-gray-200 max-h-[360px]">
          <figure className="h-40 overflow-hidden">
            <img
              src={data.profilePic}
              alt={name}
              className="w-full h-full object-cover"
            />
          </figure>

          <div className="card-body items-center text-center">
            <h2 className="text-2xl font-bold mb-1">{data.name}</h2>

            <p className="text-lg text-gray-600 mb-4">{data.specialty}</p>

            <div className="flex justify-between w-full mt-2 px-4">
              <div className="flex flex-col items-center">
                <div className="flex items-center space-x-1">
                  <span className="text-yellow-500 text-lg">⭐</span>
                  <span className="text-xl font-semibold">{data.rating}</span>
                </div>
                <span className="text-sm text-gray-500">Rating</span>
              </div>

              <div className="border-l border-gray-300"></div>

              <div className="flex flex-col items-center">
                <span className="text-xl font-semibold">
                  {data.studentsEnrolled.toLocaleString()}
                </span>
                <span className="text-sm text-gray-500">Students</span>
              </div>

              <div className="border-l border-gray-300"></div>

              <div className="flex flex-col items-center">
                <span className="text-xl font-semibold">{data.coursesCount}</span>
                <span className="text-sm text-gray-500">Courses</span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
    </div>
  );
};

export default TopInstructor;
