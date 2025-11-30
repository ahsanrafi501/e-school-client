import React from "react";
import { motion } from "motion/react";

const PopularCard = ({ popularCard }) => {
  console.log(popularCard);
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      className="card bg-base-100 w-96 shadow-sm"
    >
      <figure>
        <img src={popularCard.thumbnail} alt="thumbnail" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{popularCard.title}</h2>
        <p>{popularCard.description}</p>
        <div className="card-actions justify-end">
          <button className="btn bg-secondary rounded-2xl">Enroll Now</button>
        </div>
      </div>
    </motion.div>
  );
};

export default PopularCard;
