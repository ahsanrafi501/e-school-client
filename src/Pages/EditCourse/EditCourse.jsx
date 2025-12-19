import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hook/UseAxiosSecure";

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const thumbnailWatch = watch("thumbnail");

  // Fetch single course
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axiosSecure.get(`/courses/${id}`);
        const courseData = res.data;

        // Split duration into hours and minutes for input fields
        let durationHours = "";
        let durationMinutes = "";
        if (courseData.duration) {
          const [h, m] = courseData.duration.match(/\d+/g) || [];
          durationHours = h || "";
          durationMinutes = m || "";
        }

        reset({
          title: courseData.title,
          thumbnail: courseData.thumbnail,
          price: courseData.price,
          durationHours,
          durationMinutes,
          category: courseData.category,
          description: courseData.description,
          isFeatured: courseData.isFeatured,
        });
      } catch (error) {
        Swal.fire({ icon: "error", title: "Failed to fetch course" });
      }
    };

    fetchCourse();
  }, [id, axiosSecure, reset]);

  const onSubmit = async (data) => {
    // Only send changed fields
    const updatedCourse = {};

    if (data.title) updatedCourse.title = data.title;
    if (data.thumbnail) updatedCourse.thumbnail = data.thumbnail;
    if (data.price) updatedCourse.price = Number(data.price);
    if (data.durationHours || data.durationMinutes) {
      updatedCourse.duration = `${data.durationHours || 0}h ${
        data.durationMinutes || 0
      }m`;
    }
    if (data.category) updatedCourse.category = data.category;
    if (data.description) updatedCourse.description = data.description;
    updatedCourse.isFeatured = data.isFeatured || false;

    if (Object.keys(updatedCourse).length === 0) {
      Swal.fire({ icon: "warning", title: "No changes to update" });
      return;
    }

    try {
      const res = await axiosSecure.put(`/courses/${id}`, updatedCourse);
      if (res.data._id) {
        Swal.fire({
          icon: "success",
          title: "Course Updated Successfully",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate("/my-courses");
      }
    } catch (error) {
      Swal.fire({ icon: "error", title: "Failed to update course" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 pt-10">
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg bg-white rounded-xl shadow-xl p-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-center mb-6">Edit Course</h2>

        {/* TITLE */}
        <div>
          <label className="font-semibold">Course Title</label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Leave blank to keep unchanged"
            {...register("title")}
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        {/* THUMBNAIL */}
        <div>
          <label className="font-semibold">Image URL</label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Leave blank to keep unchanged"
            {...register("thumbnail")}
          />
          {thumbnailWatch && (
            <img
              src={thumbnailWatch}
              alt="Preview"
              className="w-40 h-24 object-cover mt-2 rounded"
            />
          )}
        </div>

        {/* PRICE */}
        <div>
          <label className="font-semibold">Price (৳)</label>
          <input
            type="number"
            className="input input-bordered w-full"
            placeholder="Leave blank to keep unchanged"
            {...register("price")}
          />
        </div>

        {/* DURATION */}
        <div>
          <label className="font-semibold">Duration</label>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              className="input input-bordered w-full"
              placeholder="Hours"
              {...register("durationHours")}
            />
            <input
              type="number"
              className="input input-bordered w-full"
              placeholder="Minutes"
              {...register("durationMinutes")}
            />
          </div>
        </div>

        {/* CATEGORY */}
        <div>
          <label className="font-semibold">Category</label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Leave blank to keep unchanged"
            {...register("category")}
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="font-semibold">Description</label>
          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Leave blank to keep unchanged"
            {...register("description")}
          ></textarea>
        </div>

        {/* FEATURED */}
        <div className="flex justify-between items-center">
          <label className="font-semibold">Featured Course?</label>
          <input type="checkbox" className="toggle toggle-primary" {...register("isFeatured")} />
        </div>

        {/* SUBMIT */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="btn btn-neutral w-full mt-4"
        >
          Update Course
        </motion.button>
      </motion.form>
    </div>
  );
};

export default EditCourse;
