'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import ClipLoader from 'react-spinners/ClipLoader';

interface Note {
  id: string;
  member: string;
  text: string;
}

const MemberNotes: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();
  const [notes, setNotes] = React.useState<Note[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const notesResponse = await axios.get(`http://localhost:3000/notes?member=${id}`);
          setNotes(notesResponse.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Notes for Member {id}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
            {notes.map((note) => (
              <li key={note.id} className="border-b border-gray-200 py-2">
                {note.text}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default MemberNotes;