'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/config';
import { useRouter } from 'next/navigation';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [signInWithEmailAndPassword, loading, error] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      const res = await signInWithEmailAndPassword(email, password);
      if (res.user) {
        const idToken = await res.user.getIdToken(); // Get the ID token (JWT)
        sessionStorage.setItem('userToken', idToken); // Store JWT token

        // Optionally store the user state
        sessionStorage.setItem('user', JSON.stringify(res.user));
        
        // Redirect to home page after sign-in
        router.push('/');
      }
    } catch (e) {
      console.error('Error signing in:', e);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Centered Text at the top of the Form */}
      <h1 className="absolute top-20 text-center text-4xl sm:text-5xl lg:text-6xl italic text-white z-10">It's Time for Film</h1>
      
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
      >
        <source src="/background-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Sign-In Box */}
      <div className="bg-gray-800 bg-opacity-80 p-10 rounded-lg shadow-xl w-[90%] sm:w-[50%] lg:w-[30%] h-[50%] flex flex-col justify-center z-10">
        <h1 className="text-white text-2xl mb-5 text-center">Sign In</h1>
        
        {/* Email Input */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 rounded text-base sm:text-lg lg:text-xl outline-none text-white placeholder-gray-500"
        />
        
        {/* Password Input */}
        <div className="relative">
          <input
            type={isPasswordVisible ? 'text' : 'password'} // Toggle password visibility
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-4 bg-gray-700 rounded text-base sm:text-lg lg:text-xl outline-none text-white placeholder-gray-500"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black"
          >
            {isPasswordVisible ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12m-3 0a3 3 0 1 0 6 0 3 3 0 1 0-6 0"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.732 5 12 5s8.268 2.943 9.542 7c-.274.845-.72 1.63-1.292 2.308M12 19c-4.268 0-8.268-2.943-9.542-7 1.274-.678 1.72-1.463 1.292-2.308"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12m-3 0a3 3 0 1 0 6 0 3 3 0 1 0-6 0"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.732 5 12 5s8.268 2.943 9.542 7c-.274.845-.72 1.63-1.292 2.308M12 19c-4.268 0-8.268-2.943-9.542-7 1.274-.678 1.72-1.463 1.292-2.308"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Sign In Button */}
        <button
          onClick={handleSignIn}
          disabled={loading}
          className="w-full p-3 bg-orange-500 rounded text-white hover:bg-orange-400 disabled:bg-orange-300"
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center mt-2">{error.message}</p>}

        <h1 className="text-white text-xl  mt-3">
          Don't have an account?{' '}
          <Link className="text-orange-500 hover:text-orange-300" href="/sign-up">
            Sign-Up
          </Link>
        </h1>
      </div>
    </div>
  );
};

export default SignIn;
