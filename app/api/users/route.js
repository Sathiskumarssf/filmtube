// app/api/users/route.js
import { dbConnect } from '../../../lib/db';
import User from '../../../models/User';

export async function GET(req, res) {
  await dbConnect(); // Ensure you're connected to MongoDB

  try {
    const users = await User.find(); // Fetch users from MongoDB

    if (users.length === 0) {
      // Insert sample data if the collection is empty
      const sampleUsers = [
        { name: 'Alice Johnson', age: 29 },
        { name: 'Bob Smith', age: 35 },
        { name: 'Charlie Brown', age: 42 },
        { name: 'Diana Prince', age: 28 },
        { name: 'Eve Adams', age: 31 }
      ];

      await User.insertMany(sampleUsers); // Insert sample data
      console.log('Inserted sample data');
    }

    return new Response(JSON.stringify(users), { status: 200 }); // Return the users
  } catch (error) {
    console.error('Error fetching users:', error);
    return new Response(
      JSON.stringify({ message: 'Server error' }),
      { status: 500 }
    );
  }
}
