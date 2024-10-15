"use client";
import React from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Carousel } from '@/components/ui/carousel';// Adjust the import based on the actual package

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
      <Carousel>
        {members.map((member) => (
          <div key={member.id} className="p-4">
            <div className="border rounded-lg shadow-lg p-4">
              <Link href={`/members/${member.id}`} className="text-blue-500 hover:underline">
                <h2 className="text-xl font-bold">{member.firstName} {member.lastName}</h2>
              </Link>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Home;