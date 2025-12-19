import React from 'react';
import UseAxiosSecure from '../../Hook/UseAxiosSecure';
import UseAuth from '../../Hook/UseAuth';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';

const ViewDetails = () => {

const axiosSecure = UseAxiosSecure();
const {id} = useParams()
const {data: course = []} = useQuery({
    queryKey:['viewDetails', id],
    queryFn: async () => {
       const result = await axiosSecure.get(`/viewDetails/${id}`)
       return result.data;
    }
})
console.log(course)
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg mt-10">
      <h1 className="text-3xl font-bold mb-4">{course.title}</h1>

      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={course.imageUrl || course.thumbnail}
          alt={course.title}
          className="w-full md:w-1/2 h-auto rounded-lg object-cover"
        />

        <div className="flex-1">
          <p><strong>Category:</strong> {course.category}</p>
          <p><strong>Price:</strong> ${course.price}</p>
          <p><strong>Duration:</strong> {course.duration}</p>
          <p><strong>Enrolled:</strong> {course.enrolled}</p>
          <p><strong>Rating:</strong> {course.rating}</p>
          <p><strong>Featured:</strong> {course.isFeatured ? "Yes" : "No"}</p>
          <p><strong>Created By:</strong> {course.email}</p>
          <p><strong>Created At:</strong> {new Date(course.createdAt).toLocaleString()}</p>
          <p className="mt-4"><strong>Description:</strong> {course.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
