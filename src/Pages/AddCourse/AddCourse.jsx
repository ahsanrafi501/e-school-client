import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import UseAuth from "../../Hook/UseAuth";
import Swal from "sweetalert2";
import axios from "axios";
import UseAxiosSecure from "../../Hook/UseAxiosSecure";

const AddCourse = () => {



  const axiosSecure = UseAxiosSecure()



  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const { user } = UseAuth();

const onSubmit = async (data) => {
  try {
    console.log("Course Data:", data);

    const res = await axiosSecure.post("/courses", data);

    // optional: check backend response
    if (res.data?.insertedId || res.data?.success) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Course Added",
        showConfirmButton: false,
        timer: 1500,
      });
      reset();
    }
  } catch (error) {
    console.error("Error adding course:", error);

    Swal.fire({
      icon: "error",
      title: "Failed to add course",
      text: error.response?.data?.message || "Something went wrong",
    });
  }
};


  return (
    <div className="min-h-screen pt-10 px-4 from-gray-100 to-gray-300">
      <motion.h2
        className="text-4xl font-bold text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Add Course
      </motion.h2>

      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="card w-full max-w-lg mx-auto shadow-2xl bg-white"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="card-body space-y-4">
          {/* EMAIL */}
          <motion.div whileHover={{ scale: 1.02 }}>
            <label className="label-text font-semibold">Email</label>
            <input
              {...register("email", { required: true })}
              defaultValue={user?.email}
              type="email"
              className="input input-bordered w-full"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">Email is required</p>
            )}
          </motion.div>

          {/* IMAGE URL */}
          <motion.div whileHover={{ scale: 1.02 }}>
            <label className="label-text font-semibold">Image URL</label>
            <input
              {...register("imgUrl", { required: true })}
              type="text"
              className="input input-bordered w-full"
              placeholder="https://example.com/image.jpg"
            />
          </motion.div>

          {/* PRICE */}
          <motion.div whileHover={{ scale: 1.02 }}>
            <label className="label-text font-semibold">Price</label>
            <input
              {...register("price", { required: true })}
              type="number"
              className="input input-bordered w-full"
              placeholder="Price"
            />
          </motion.div>

          {/* DURATION */}
          <motion.div whileHover={{ scale: 1.02 }}>
            <label className="label-text font-semibold">Duration</label>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                min="0"
                {...register("durationHours", { required: true })}
                className="input input-bordered w-full"
                placeholder="Hours"
              />

              <input
                type="number"
                min="0"
                max="59"
                {...register("durationMinutes", { required: true })}
                className="input input-bordered w-full"
                placeholder="Minutes"
              />
            </div>
          </motion.div>

          {/* CATEGORY */}
          <motion.div whileHover={{ scale: 1.02 }}>
            <label className="label-text font-semibold">Category</label>
            <input
              {...register("category", { required: true })}
              type="text"
              className="input input-bordered w-full"
              placeholder="Web Development"
            />
          </motion.div>

          {/* DESCRIPTION */}
          <motion.div whileHover={{ scale: 1.02 }}>
            <label className="label-text font-semibold">Description</label>
            <textarea
              {...register("description", { required: true })}
              className="textarea textarea-bordered w-full"
              placeholder="Write something..."
            />
          </motion.div>

          {/* IS FEATURED */}
          <motion.div
            className="flex items-center justify-between"
            whileHover={{ scale: 1.02 }}
          >
            <label className="label-text font-semibold">Featured?</label>
            <input
              {...register("isFeatured")}
              type="checkbox"
              className="toggle toggle-primary"
            />
          </motion.div>

          {/* SUBMIT BUTTON */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-neutral w-full mt-4"
            transition={{ type: "spring", stiffness: 300 }}
          >
            Add Course
          </motion.button>
        </div>
      </motion.form>
    </div>
  );
};

export default AddCourse;
