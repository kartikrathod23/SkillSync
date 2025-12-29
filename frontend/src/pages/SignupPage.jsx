import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
const API_BASE = import.meta.env.VITE_API_BASE_URL;


const SignupPage = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        fullname: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        skills: '',
        interests:'',
        experienceLevel: '',
        experienceSummary:'',
        github: '',
        linkedin: '',
        portfolio: '',
        bio:''
    });
    
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNext = () => {
        if (step < 3) setStep(step + 1);
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log('Final Data:', formData);
        // Add backend integration here

        const processedData = {
            ...formData,
            skills: formData.skills.split(',').map(skill => skill.trim()), 
            interests: formData.interests.split(',').map(interest => interest.trim()),
        };

        try{
            const res = await fetch(`${API_BASE}/api/auth/register`,{
                method:'POST',
                headers:{'Content-Type': 'application/json'},
                body:JSON.stringify(processedData)
            })

            const data = await res.json();
            if(res.ok){
                // alert('Registered Successfully!')
                navigate('/dashboard')
            } else{
                alert(data.error || "Registration failed");
            }
        }catch(e){
            console.log(e);
        }
    };

    return (
        <div className=" flex items-center justify-center h-screen mx-auto bg-white px-4 w-full max-w-4xl ">
            <Navbar />
            {/* Left Section */}
            <div className="w-1/2 h-[80vh] flex flex-col justify-center items-center bg-orange-100 px-10 py-8 rounded-l-3xl mt-16">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Discover new skills and passions</h2>
                <p className="text-gray-700 text-md mb-6">Explore a world of knowledge and growth.</p>
                <img src="https://cdni.iconscout.com/illustration/premium/thumb/people-doing-handshake-4912865-4081266.png" alt="illustration" className="w-3/4 h-auto" />
                <p className="text-sm text-gray-600 mt-4">Expand your knowledge with <span className="font-semibold text-black">SkillBridge</span>.</p>
            </div>

            {/* Right Section - Form */}
            <div className="w-1/2 flex flex-col justify-center px-14 py-10 mt-16">
                <h2 className="text-xl font-bold text-gray-800 mb-1">Join SkillSync today</h2>
                <p className="text-sm text-gray-600 mb-8">Unlock a world of learning opportunities.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {step === 1 && (
                        <>
                            <input
                                type="text"
                                name="fullname"
                                placeholder="Your full name"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-lg"
                                required
                            />
                            <input
                                type="text"
                                name="username"
                                placeholder="Your unique username"
                                value={formData.username}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-lg"
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email address"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-lg"
                                required
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-lg"
                                required
                            />
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Repeat password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-lg"
                                required
                            />
                        </>
                    )}

                    {step === 2 && (
                        <>
                            {/* <h2 className="text-xl font-bold mb-4">Step 2: Skills & Experience</h2> */}
                            <label className='text-black font-semibold text-lg' htmlFor="skills">Skills you can teach</label>
                            <input
                                type="text"
                                name="skills"
                                placeholder="Skills (e.g. Web Development, UI/UX)"
                                value={formData.skills}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-lg"
                                required
                            />
                            <label className='text-gray-900 text-lg font-semibold' htmlFor="interest">Skills you want to learn</label>
                            <input
                                type="text"
                                name="interests"
                                placeholder="Interests (e.g. Startups, Design, Marketing)"
                                value={formData.interests}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-lg"
                                required
                            />
                            <select
                                name="experienceLevel"
                                value={formData.experienceLevel}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-lg"
                                required
                            >
                                <option value="">Select Experience Level</option>
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Expert">Expert</option>
                            </select>

                            <textarea
                                name="experienceSummary"
                                placeholder="Experience summary"
                                value={formData.experienceSummary}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-lg h-28"
                                required
                            ></textarea>
                            {/* /> */}
                        </>
                    )}

                    {step === 3 && (
                        <>
                            <input
                                type="url"
                                name="github"
                                placeholder="GitHub profile link"
                                value={formData.github}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-lg"
                            />
                            <input
                                type="url"
                                name="linkedin"
                                placeholder="LinkedIn profile link"
                                value={formData.linkedin}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-lg"
                            />
                            <input
                                type="url"
                                name="portfolio"
                                placeholder="Portfolio website link"
                                value={formData.portfolio}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-lg"
                            />
                            <textarea
                                name="bio"
                                placeholder="Tell us about yourself"
                                value={formData.bio}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg h-28"
                                required
                            ></textarea>

                        </>
                    )}

                    {/* Buttons */}
                    <div className="flex justify-between items-center pt-4">
                        {step > 1 ? (
                            <button
                                type="button"
                                onClick={handleBack}
                                className="text-orange-600 font-medium"
                            >
                                ← Back
                            </button>
                        ) : <div />}
                        {step < 3 ? (
                            <button
                                type="button"
                                onClick={handleNext}
                                className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700"
                            >
                                Next →
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700"
                            >
                                Sign up
                            </button>
                        )}
                    </div>
                </form>

                {/* Optional Social Login Section */}
                {/* <div className="text-center mt-6">
                    <p className="text-sm text-gray-500">or continue with</p>
                    <div className="flex gap-4 justify-center mt-3">
                        <button className="px-6 py-2 border rounded-full">Google</button>
                        <button className="px-6 py-2 border rounded-full">Facebook</button>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default SignupPage;
