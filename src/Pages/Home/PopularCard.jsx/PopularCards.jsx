import React, { use } from "react";
import PopularCard from "./PopularCard";
import { Link } from "react-router";
import UseAuth from "../../../Hook/UseAuth";
import UseAxiosSecure from "../../../Hook/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const PopularCards = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
    const { data = [] }= useQuery({
    queryKey: ["top-course", user],
    queryFn: async () => {
      const res = await axiosSecure.get("/top-courses");
      return res.data;
    },
  });

  return (
    <div className="max-w-7xl mx-auto  my-7">
      <div>
        <h2 className="text-5xl font-bold text-center my-7">Popular Courses</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
        {data.sort((a, b) => b.rating - a.rating).map((d) => (
          <PopularCard
            key={d._id}
            d={d}
          ></PopularCard>
        ))}
      </div>
      <div className="flex justify-center">
        <Link to={"/all-courses"} className="btn my-7">
          All Courses
        </Link>
      </div>
    </div>
  );
};

export default PopularCards;
