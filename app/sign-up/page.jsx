'use client'
import { useState } from 'react';
import Link from 'next/link';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/config';
import { useRouter } from 'next/navigation';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
  const router = useRouter();

  const handleSignUp = async () => {
    try {
      const res = await createUserWithEmailAndPassword(email, password);
      console.log({ res });
      sessionStorage.setItem('user', true);
      setEmail('');
      setPassword('');
      router.push('/');
    } catch (e) {
      console.error(e);
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

      {/* Sign-Up Box */}
      <div className="bg-gray-800 bg-opacity-80 p-10 rounded-lg shadow-xl w-[90%] sm:w-[50%] lg:w-[30%] h-[50%] flex flex-col justify-center z-10">
        <h1 className="text-white text-2xl mb-5 text-center">Sign Up</h1>
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
          onClick={handleSignUp}
          className="w-full p-3 bg-orange-500 rounded text-white hover:bg-orange-400"
        >
          Sign Up
        </button>
        <h1 className='text-white text-xl'>Have account <Link className='text-orange-500 hover:text-orange-300' href="/sign-in">Sign-In</Link></h1>
      </div>
    </div>
  );
};

export default SignUp;
