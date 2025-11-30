import React from "react";
import { motion } from "motion/react";

const WhyUS = () => {
  const titles = [
    {
      title: "Online Billing, Invoicing, & Contracts",
      description:
        "Manage payments, invoices, and contracts digitally with automated workflows.",
    },
    {
      title: "Easy Scheduling & Attendance Tracking",
      description:
        "Simplify scheduling and track attendance effortlessly with real-time updates.",
    },
    {
      title: "Performance Tracking",
      description:
        "Monitor student's details, activity, and engagement in one centralized system.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-5xl my-5 font-bold text-center text-[#00CBB8]">
        Why <span className="text-[#2F327D]">Choose</span> Us?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 my-5">
        {titles.map((title, index) => (
          <motion.div
            whileHover={{ scale: 1.1 }}
            key={index}
            className="card bg-[#FFFFFF] max-w-7xl mx-auto card-sm shadow-sm"
          >
            <div className="card-body">
              <h2 className="card-title text-[30px] p-5 font-semibold text-[#2F327D]">
                {title.title}
              </h2>
              <p className="text-[20px] p-5 text-[#696984]">
                {title.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WhyUS;
