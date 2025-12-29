import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <>
            {/* Navbar */}
            <header className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    {/* Logo */}
                    {/* <div className="flex items-center gap-2">
                        <img src={logo} alt="Logo" className="h-8 w-8" />
                        <span className="font-bold text-xl text-amber-600">SkillLink</span>
                    </div> */}
                    <Link to={'/'} className="hover:text-amber-500 text-orange-500 font-extrabold text-2xl">SKILLSYNC</Link>

                    {/* Navigation Links */}
                    <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
                        <Link to="/" className="hover:text-amber-500">Home</Link>
                        <Link to="/about" className="hover:text-amber-500">About</Link>
                        <Link to="/features" className="hover:text-amber-500">Features</Link>
                        <Link to="/" className="hover:text-amber-500">Contact</Link>
                    </nav>

                    {/* Auth Buttons */}
                    <div className="flex gap-3">
                        <Link
                            to="/login"
                            className="text-sm px-4 py-2 border border-amber-500 text-amber-600 rounded-md hover:bg-amber-50 transition"
                        >
                            Login
                        </Link>
                        <Link
                            to="/signup"
                            className="text-sm px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition"
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Navbar
