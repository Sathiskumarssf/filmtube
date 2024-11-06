'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/config';
import { useRouter } from 'next/navigation';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      const res = await signInWithEmailAndPassword(email, password);
      if (res.user) {
        // Firebase generates a JWT token
        const idToken = await res.user.getIdToken(); // Get the ID token (JWT)
        
        // Store the JWT token in sessionStorage (or localStorage)
        sessionStorage.setItem('userToken', idToken); 

      
        // Optionally, you can store the user state in sessionStorage or other storage
        sessionStorage.setItem('user', JSON.stringify(res.user));
        const userDetails = JSON.parse(sessionStorage.getItem('user'));
        console.log('User Email:', userDetails.email);
        // Reset form fields
        setEmail('');
        setPassword('');
        
        // Redirect to home page after sign-in
         
      }
    } catch (e) {
      console.error('Error signing in:', e);
    }
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
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 rounded text-base sm:text-lg lg:text-xl outline-none text-white placeholder-gray-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 rounded text-base sm:text-lg lg:text-xl outline-none text-white placeholder-gray-500"
        />
        <button
          onClick={handleSignIn}
          className="w-full p-3 bg-orange-500 rounded text-white hover:bg-orange-400"
        >
          Sign In
        </button>
        <h1 className='text-white text-xl'>
          Don't have an account? <Link className='text-orange-500 hover:text-orange-300' href="/sign-up">Sign-Up</Link>
        </h1>
      </div>
    </div>
  );
};

export default SignIn;
