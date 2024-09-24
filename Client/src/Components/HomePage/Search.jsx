// Search.js
import { Container } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';

export const Search = () => {
  const [query, setQuery] = useState('INR');
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const fetchCountries = async (currencyCode) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`https://restcountries.com/v3.1/currency/${currencyCode}`);
      console.log(response)
      if (!response.ok) {
        throw new Error('Failed to fetch countries');
      }
      const data = await response.json();
      setCountries(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Debounced search
  useEffect(() => {
    const handler = setTimeout(() => {
      if (query) {
        fetchCountries(query);
      } else {
        setCountries([]);
      }
    }, 500); // 500ms delay

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  const sortedCountries = countries.sort((a, b) => {
    return sortOrder === 'asc'
      ? a.name.common.localeCompare(b.name.common)
      : b.name.common.localeCompare(a.name.common);
  });

  const toggleSortOrder = () => {
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchCountries(query);
  };

  return (
    <>
      <Container maxW={'6xl'}>
        <h1 className='text-center pt-20 pb-10 font-bold text-5xl'>Enter Currency Code to start Search..</h1>
        <div className=''>
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input 
            type="search" 
            id="default-search" 
            className="block border-4 text-center text-xl w-full px-10 py-5 ps-10 text-sm text-yellow-500 border font-bold border-yellow-300 rounded-lg bg-gray-50 focus:ring-yellow-500 focus:border-yellow-500" 
            placeholder="Enter currency code..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required 
          />
          
        </div>
        </div>
      

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {countries.length > 0 && (
        <div>
          <div className='border-b-4 py-4'>
            <button onClick={toggleSortOrder} className="mb-4 p-2 float-right bg-yellow-300 text-black rounded">
             ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
            </button>
          </div>
          
          <div className='mt-20'>
          {sortedCountries.map(country => (
            <div key={country.cca2} className="rounded-xl border-4 border-yellow-500 bg-yellow-50 mb-5 font-medium text-center pb-5 pt-5">
                    <center><img 
                        src={country.flags.png} 
                        alt={`${country.name.common} flag`} 
                    /></center>
                    <h2 className="font-bold mt-3 text-4xl">{country.name.common}</h2>
                    <p>Currency: {Object.values(country.currencies).map(curr => curr.name).join(', ')}</p>
                    <p>Capital: {country.capital.join(', ')}</p>
                    <p>Languages: {Object.values(country.languages).join(', ')}</p>
            </div>
          
          
          ))}
          </div>
        </div>
      )}

      {countries.length === 0 && !loading && <p className='my-5 text-center p-5 bg-yellow-200 rounded-md font-bold'>No countries found. Please try a different currency code.</p>}
      </Container>
    </>
  );
};
