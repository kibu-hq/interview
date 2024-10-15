"use client";
import React from 'react';
import axios from 'axios';
import Link from 'next/link';

interface Member {
  id: string;
  firstName: string;
  lastName: string;
}

const Home: React.FC = () => {
  const [members, setMembers] = React.useState<Member[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const membersResponse = await axios.get('http://localhost:3000/members');
        setMembers(membersResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Members</h1>
      <ul>
        {members.map((member) => (
          <li key={member.id} className="border-b border-gray-200 py-2">
            <Link href={`/members/${member.id}`} className="text-blue-500 hover:underline">
              {member.firstName} {member.lastName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;