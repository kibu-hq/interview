'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation'; // Import useParams from next/navigation
import axios from 'axios';

interface Note {
  id: string;
  member: string;
  text: string;
}

const MemberNotes: React.FC = () => {
  const router = useRouter();
  const { id } = useParams(); // Use useParams to get the id
  const [notes, setNotes] = React.useState<Note[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const notesResponse = await axios.get(`http://localhost:3000/notes?member=${id}`);
          setNotes(notesResponse.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [id]);

  if (!id) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Notes for Member {id}</h1>
      <ul>
        {notes.map((note) => (
          <li key={note.id} className="border-b border-gray-200 py-2">
            {note.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MemberNotes;