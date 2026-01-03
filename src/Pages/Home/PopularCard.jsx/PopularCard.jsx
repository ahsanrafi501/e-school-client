import { motion } from "motion/react";
import { useNavigate } from "react-router";
import UseAxiosSecure from "../../../Hook/UseAxiosSecure";
import UseAuth from "../../../Hook/UseAuth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const PopularCard = ({ d }) => {
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch enrolled courses for this user
  const { data: enrolledCourses = [], isLoading } = useQuery({
    queryKey: ["myEnrolledCourse", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-enrolled-course?email=${user.email}`, {
        headers: {
          authorization: `Brearer ${user.accessToken}`
        }
      });
      return res.data;
    },
  });

  // Mutation to enroll
  const enrollMutation = useMutation({
    mutationFn: async () => {
      return axiosSecure.post("/my-enrolled-course", {
        courseId: d._id,
        userEmail: user.email,
        title: d.title,
        thumbnail: d.thumbnail,
        price: d.price,
        category: d.category,
        duration: `${d.durationHours}h ${d.durationMinutes}m`,
        enrolledAt: new Date(),
      });
    },
    onSuccess: () => {
      // Refresh enrolled courses after enrollment
      queryClient.invalidateQueries(["myEnrolledCourse", user?.email]);
    },
  });

  const handleEnroll = (e) => {
    e.stopPropagation();
    if (!user) return navigate("/login");
    enrollMutation.mutate();
  };

  const handleViewDetails = () => navigate(`/viewDetails/${d._id}`);

  if (isLoading) return null; // or a loader

  // Check if this course is already enrolled
  const isEnrolled = enrolledCourses.some(
    (course) => String(course.courseId) === String(d._id)
  );

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="card bg-base-100 w-96 shadow-sm cursor-pointer"
      onClick={handleViewDetails}
    >
      <figure>
        <img src={d.thumbnail} alt={d.title} className="h-48 w-full object-cover" />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{d.title}</h2>
        <p>{d.description}</p>

        <div className="card-actions justify-end">
          {!isEnrolled ? (
            <button
              onClick={handleEnroll}
              className="btn bg-secondary rounded-2xl"
              disabled={enrollMutation.isLoading}
            >
              Enroll Now
            </button>
          ) : (
            <button disabled className="btn btn-success rounded-2xl">
              Enrolled
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PopularCard;
