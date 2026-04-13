'use client';

import withAuth from '@/components/auth/withAuth';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

type Video = {
  id: string;
  title: string;
  year: number;
  rating: number; // 0 ~ 5
  genre: string;
  thumbnail: string;
};

export function VideoPage() {
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState<Video[]>([]);
  const [filtered, setFiltered] = useState<Video[]>([]);

  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [year, setYear] = useState('');
  const [sortBy, setSortBy] = useState('title');

  // 🔹 Fetch videos (replace with OMDb / TMDb later)
  const fetchVideos = useCallback(async () => {
    try {
      setLoading(true);

      // TODO: Replace with real API
      const mock: Video[] = [
        {
          id: '1',
          title: 'Inception',
          year: 2010,
          rating: 4.5,
          genre: 'Sci-Fi',
          thumbnail: '/placeholder.png',
        },
        {
          id: '2',
          title: 'Interstellar',
          year: 2014,
          rating: 4.7,
          genre: 'Sci-Fi',
          thumbnail: '/placeholder.png',
        },
        {
          id: '3',
          title: 'The Dark Knight',
          year: 2008,
          rating: 4.9,
          genre: 'Action',
          thumbnail: '/placeholder.png',
        },
      ];

      setVideos(mock);
      setFiltered(mock);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  // 🔹 Filtering + Sorting
  useEffect(() => {
    let result = [...videos];

    if (query) {
      result = result.filter((v) =>
        v.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    if (genre) {
      result = result.filter((v) => v.genre === genre);
    }

    if (year) {
      result = result.filter((v) => v.year === Number(year));
    }

    result = result.filter((v) => v.rating >= minRating);

    // sorting
    result.sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'year') return b.year - a.year;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

    setFiltered(result);
  }, [videos, query, genre, year, minRating, sortBy]);

  // if (loading) return <Loading width={200} />;

  return (
    <div className="w-[1000px] p-xl bg-light-background rounded-lg flex flex-col gap-lg">
      <h2 className="text-xl font-bold">Video Search</h2>

      {/* 🔍 Filters */}
      <div className="grid grid-cols-5 gap-md">
        <input
          placeholder="Search title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-sm border rounded"
        />

        <input
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="p-sm border rounded"
        />

        <input
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="p-sm border rounded"
        />

        <input
          type="number"
          step="0.1"
          placeholder="Min rating"
          value={minRating}
          onChange={(e) => setMinRating(Number(e.target.value))}
          className="p-sm border rounded"
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-sm border rounded"
        >
          <option value="title">Title</option>
          <option value="year">Year</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      {/* 🎬 Video List */}
      <div className="grid grid-cols-3 gap-lg">
        {filtered.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-500">No results found</p>
      )}
    </div>
  );
}

// 🎬 Video Card
function VideoCard({ video }: { video: Video }) {
  return (
    <div className="bg-default rounded-lg p-md flex flex-col gap-sm">
      <div className="w-full h-[200px] relative">
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          style={{ objectFit: 'cover' }}
          className="rounded"
        />
      </div>

      <h3 className="font-semibold">{video.title}</h3>

      <div className="text-sm text-gray-500">
        {video.year} • {video.genre}
      </div>

      <div className="font-medium">⭐ {video.rating.toFixed(1)} / 5</div>
    </div>
  );
}
export default withAuth(VideoPage, 'video');
