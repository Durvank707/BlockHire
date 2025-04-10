import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

function FreelancerWork() {
    const { id } = useParams();
    const [freelancer, setFreelancer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate=useNavigate();

    useEffect(() => {
        const fetchFreelancer = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/freelancers/${id}`);

                if (!response.ok) {
                    throw new Error("Freelancer not found");
                }

                const data = await response.json();
                

                if (data.success) {
                    setFreelancer(data.data);
                } else {
                    throw new Error(data.message || "Failed to fetch freelancer details");
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFreelancer();
    }, [id]);

    if (loading) return <p className="text-center text-gray-500 text-lg">Loading freelancer details...</p>;
    if (error) return <p className="text-center text-red-500 text-lg">{error}</p>;
    if (!freelancer) return <p className="text-center text-red-500 text-lg">Freelancer Not Found</p>;

    return (
        <div className="font-title p-6">
            {/* Profile Info */}
            <div className="flex mb-6">
                <div className="w-[25%] h-[20%]">
                    <img
                        src={freelancer?.photoUrl || "/ProfileImages/default-profile.jpg"}
                        alt={freelancer?.name}
                        className="rounded-full w-fit motion-preset-expand motion-duration-200"
                    />
                </div>
                <div className="w-2/3 pl-6 flex flex-col justify-center">
                    <h2 className="text-2xl font-bold">{freelancer?.name}</h2>
                    <div className="flex items-center text-lg mt-2">
                        <span className="text-yellow-500">★</span>
                        <span className="ml-1">{freelancer?.rating || "No rating"}</span>
                    </div>
                    <div className="flex space-x-2 mt-2">
                        {freelancer?.occupation?.map((item, index) => (
                            <div
                                key={index}
                                className="px-2 py-1 border border-gray-300 rounded-md"
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                    <div className="mt-2 text-gray-600 flex">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 ml-2">
                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM8.547 4.505a8.25 8.25 0 1 0 11.672 8.214l-.46-.46a2.252 2.252 0 0 1-.422-.586l-1.08-2.16a.414.414 0 0 0-.663-.107.827.827 0 0 1-.812.21l-1.273-.363a.89.89 0 0 0-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.211.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 0 1-1.81 1.025 1.055 1.055 0 0 1-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.654-.261a2.25 2.25 0 0 1-1.384-2.46l.007-.042a2.25 2.25 0 0 1 .29-.787l.09-.15a2.25 2.25 0 0 1 2.37-1.048l1.178.236a1.125 1.125 0 0 0 1.302-.795l.208-.73a1.125 1.125 0 0 0-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 0 1-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 0 1-1.458-1.137l1.279-2.132Z" clipRule="evenodd" />
                        </svg>
                        {freelancer?.country || "Location not available"}
                    </div>
                    <div className="flex mt-2 space-x-2">
                        {freelancer?.languages?.map((lang, index) => (
                            <div key={index} className="px-2 py-1 bg-gray-100 rounded-md">
                                {lang}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* About Me */}
            <div className="flex">
                <div className="mb-6 w-[70%]">
                    <h3 className="text-xl font-semibold mb-2">About Me</h3>
                    <p>{freelancer?.bio || "No bio available"}</p>
                </div>

                <div className='border-black border-2 flex flex-col justify-between w-[30%] ml-4 rounded-lg'>
                    <div className="pl-4 pt-8 font-semibold text-xl flex justify-start items-center">
                        <img 
                            src={freelancer?.photoUrl || "/ProfileImages/default-profile.jpg"} 
                            alt="" 
                            className="w-32 rounded-full m-4 motion-preset-expand motion-duration-250" 
                        />
                        {freelancer?.name}
                    </div>
                    <button onClick={()=>{
                        navigate(`/chat/${freelancer.userId}`)
                    }} className='m-4 px-8 py-3 text-white bg-primary justify-center items-center flex rounded-lg font-semibold hover:text-black hover:bg-secondary'>
                        <h3>Contact Me</h3>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 ml-2 text-white">
                            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                        </svg>
                    </button>
                    {/* <button onClick={() => navigate(`/chat/${freelancer.userId}`)}>Contact</button> */}
                </div>
            </div>

            {/* Skills */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Skills</h3>
                <div className="flex flex-wrap gap-4">
                    {freelancer?.skills?.map((skill, index) => (
                        <div
                            key={index}
                            className="px-4 py-2 border border-gray-300 rounded-md"
                        >
                            {skill}
                        </div>
                    ))}
                </div>
            </div>

            {/* My Work */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">My Work</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {freelancer?.work?.map((workItem) => (
                        <Link 
                            to="/freelancerwork"
                            key={workItem.key}
                            className="border border-gray-300 rounded-md p-4 motion-preset-bounce motion-duration-300"
                        >
                            <img
                                src={workItem.project_images}
                                alt=""
                                className="w-full h-40 object-cover rounded-md"
                            />
                            <p className="mt-2">{workItem.project_description}</p>
                            <div className="flex items-center mt-2 text-yellow-500">
                                ★ <span className="ml-1">{workItem.project_rating}</span>
                            </div>
                            <p className="mt-2 text-green-500">From: ${workItem.price}</p>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Reviews */}
            <div>
                <h3 className="text-xl font-semibold mb-2">Reviews</h3>
                <div className="space-y-4">
                    {freelancer?.reviews?.map((review) => (
                        <div
                            key={review.key}
                            className="flex items-start space-x-4 border border-gray-300 p-4 rounded-md"
                        >
                            <img
                                src={review.profile_image}
                                alt={review.name}
                                className="w-12 h-12 rounded-full"
                            />
                            <div>
                                <h4 className="font-semibold">{review.name}</h4>
                                <p>{review.msg}</p>
                                <div className="text-yellow-500 mt-1">★ {review.rating}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FreelancerWork;