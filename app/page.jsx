'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';  // To redirect if not authenticated
import Navbar from './components/Navbar';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();  // Initialize router to redirect if needed

  useEffect(() => {
    // Check if the user is authenticated by verifying the JWT token
    const token = sessionStorage.getItem('userToken');
    
    // If token is not available, redirect to sign-in page
    if (!token) {
      router.push('/sign-in'); // Redirect to sign-in page
      return;
    }

    // Optionally, you can verify the token's validity here by making an API request

    async function fetchUsers() {
      try {
        const response = await fetch('http://localhost:3000/api/users', {
          headers: {
            Authorization: `Bearer ${token}`  // Pass the JWT token in the request header
          }
        });

        // Check if the response is ok (status 200-299)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json(); // Parse the JSON data
        setUsers(data); // Set the users data in the state
        setLoading(false); // Set loading to false once the data is fetched
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }

    fetchUsers();
  }, [router]);  // Empty dependency array ensures this runs only once when the component mounts

  if (loading) return <p>Loading...</p>; // Show loading message while data is being fetched

  return (
    <div>
      <Navbar />
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} -- {user.age} years old
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersPage;
