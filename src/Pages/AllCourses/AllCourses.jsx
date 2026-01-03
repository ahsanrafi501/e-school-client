import React from "react";
import UseAuth from "../../Hook/UseAuth";
import UseAxiosSecure from "../../Hook/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import PopularCard from "../Home/PopularCard.jsx/PopularCard";

const AllCourses = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const { data = [] } = useQuery({
    queryKey: ["allcourses", user],
    queryFn: async () => {
      const res = await axiosSecure.get("/courses", {
        headers: {
          authorization: `Bearer ${user.accessToken}`
        }
      });
      return res.data;
    },
  });

  return (
    <div>
      <h2 className="text-center text-4xl font-bold my-5">All <span className='text-blue-800'>courses</span> ({data?.length})</h2>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl m-auto">
        {data.map((d) => (
          <PopularCard key={d._id} d={d}></PopularCard>
        ))}
      </div>
    </div>
  );
};

export default AllCourses;
