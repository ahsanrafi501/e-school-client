import React, { use } from "react";
import PopularCard from "./PopularCard";
import { Link } from "react-router";

const PopularCards = ({ popularCardPromise }) => {
  const popularCards = use(popularCardPromise);
  console.log(popularCards);

  return (
    <div className="max-w-7xl mx-auto  my-7">
      <div>
        <h2 className="text-5xl font-bold text-center my-7">Popular Courses</h2>
      </div>
      <div className="grid place-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
        {popularCards.map((popularCard) => (
          <PopularCard
            key={popularCard.id}
            popularCard={popularCard}
          ></PopularCard>
        ))}
      </div>
      <div className="flex justify-center">
        <Link to={"/"} className="btn my-7">
          All Courses
        </Link>
      </div>
    </div>
  );
};

export default PopularCards;
