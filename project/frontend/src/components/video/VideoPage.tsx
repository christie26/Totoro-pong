'use client';

import Image from 'next/image';
import { useCallback, useEffect, useMemo, useState } from 'react';
import MultiSelectDropdown from './MultiSelectDropdown';

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
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [startYear, setStartYear] = useState<number | ''>('');
  const [endYear, setEndYear] = useState<number | ''>('');
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
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
        {
          id: '4',
          title: 'The Shawshank Redemption',
          year: 1994,
          rating: 4.8,
          genre: 'Drama',
          thumbnail: '/placeholder.png',
        },
        {
          id: '5',
          title: 'Pulp Fiction',
          year: 1994,
          rating: 4.7,
          genre: 'Crime',
          thumbnail: '/placeholder.png',
        },
        {
          id: '6',
          title: 'The Godfather',
          year: 1972,
          rating: 4.9,
          genre: 'Crime',
          thumbnail: '/placeholder.png',
        },
        {
          id: '7',
          title: 'Forrest Gump',
          year: 1994,
          rating: 4.6,
          genre: 'Drama',
          thumbnail: '/placeholder.png',
        },
        {
          id: '8',
          title: 'The Matrix',
          year: 1999,
          rating: 4.8,
          genre: 'Sci-Fi',
          thumbnail: '/placeholder.png',
        },
        {
          id: '9',
          title: 'Gladiator',
          year: 2000,
          rating: 4.5,
          genre: 'Action',
          thumbnail: '/placeholder.png',
        },
        {
          id: '10',
          title: 'Avatar',
          year: 2009,
          rating: 4.3,
          genre: 'Sci-Fi',
          thumbnail: '/placeholder.png',
        },
        {
          id: '11',
          title: 'Titanic',
          year: 1997,
          rating: 4.4,
          genre: 'Romance',
          thumbnail: '/placeholder.png',
        },
        {
          id: '12',
          title: 'The Avengers',
          year: 2012,
          rating: 4.6,
          genre: 'Action',
          thumbnail: '/placeholder.png',
        },
        {
          id: '13',
          title: 'Jurassic Park',
          year: 1993,
          rating: 4.2,
          genre: 'Adventure',
          thumbnail: '/placeholder.png',
        },
        {
          id: '14',
          title: 'Star Wars: A New Hope',
          year: 1977,
          rating: 4.7,
          genre: 'Sci-Fi',
          thumbnail: '/placeholder.png',
        },
        {
          id: '15',
          title: 'The Lion King',
          year: 1994,
          rating: 4.5,
          genre: 'Animation',
          thumbnail: '/placeholder.png',
        },
        {
          id: '16',
          title: 'Back to the Future',
          year: 1985,
          rating: 4.6,
          genre: 'Sci-Fi',
          thumbnail: '/placeholder.png',
        },
        {
          id: '17',
          title: 'Braveheart',
          year: 1995,
          rating: 4.4,
          genre: 'Action',
          thumbnail: '/placeholder.png',
        },
        {
          id: '18',
          title: 'Schindler\'s List',
          year: 1993,
          rating: 4.8,
          genre: 'Drama',
          thumbnail: '/placeholder.png',
        },
        {
          id: '19',
          title: 'Fight Club',
          year: 1999,
          rating: 4.7,
          genre: 'Drama',
          thumbnail: '/placeholder.png',
        },
        {
          id: '20',
          title: 'The Lord of the Rings: The Fellowship of the Ring',
          year: 2001,
          rating: 4.8,
          genre: 'Fantasy',
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

  const genres = useMemo(() => [...new Set(videos.map(v => v.genre))].sort(), [videos]);
  const years = useMemo(() => [...new Set(videos.map(v => v.year))].sort(), [videos]);
  const ratingOptions = [1, 2, 3, 4, 5];

  // 🔹 Filtering + Sorting
  useEffect(() => {
    let result = [...videos];

    if (query) {
      result = result.filter((v) =>
        v.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    if (selectedGenres.length > 0) {
      result = result.filter((v) => selectedGenres.includes(v.genre));
    }

    if (startYear !== '' || endYear !== '') {
      result = result.filter((v) => {
        const year = v.year;
        if (startYear !== '' && year < startYear) return false;
        if (endYear !== '' && year > endYear) return false;
        return true;
      });
    }

    if (selectedRatings.length > 0) {
      result = result.filter((v) => selectedRatings.includes(Math.floor(v.rating)));
    }

    // sorting
    result.sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'year') return b.year - a.year;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

    setFiltered(result);
  }, [videos, query, selectedGenres, startYear, endYear, selectedRatings, sortBy]);

  // if (loading) return <Loading width={200} />;

  return (
    <div className="w-[1000px] p-xl bg-light-background rounded-lg flex flex-col gap-lg">
      <h2 className="text-xl font-bold">Video Search</h2>

      {/* 🔍 Filters */}
      <div className="flex felx-row gap-md">
        <input
          placeholder="Search title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-sm border rounded h-xs w-[200px] text-sm"
        />
        <MultiSelectDropdown
          selectedValues={selectedGenres}
          options={genres}
          labelKey="Genre"
          clearable={true}
          onUpdate={setSelectedGenres}
        />
        <MultiSelectDropdown
          selectedValues={selectedRatings.map(String)}
          options={ratingOptions.map(String)}
          labelKey="Rating"
          clearable={true}
          onUpdate={(vals) => setSelectedRatings(vals.map(Number))}
        />
        <div className="flex items-center gap-sm h-xs text-sm bg-default rounded-sm px-xs">
          <p>
          Year: 
          </p>
          <input
            placeholder="Start year"
            value={startYear}
            onChange={(e) => setStartYear(e.target.value ? Number(e.target.value) : '')}
            className="p-sm border rounded flex-1 w-lg text-sm h-xs"
          />
          <input
            placeholder="End year"
            value={endYear}
            onChange={(e) => setEndYear(e.target.value ? Number(e.target.value) : '')}
            className="p-sm border rounded flex-1 w-lg text-sm h-xs"
          />
        </div>

        

        {/* <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-sm border rounded"
        >
          <option value="title">Title</option>
          <option value="year">Year</option>
          <option value="rating">Rating</option>
        </select> */}
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