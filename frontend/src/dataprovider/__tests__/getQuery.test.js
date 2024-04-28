import { act, renderHook } from '@testing-library/react';
import { useEffect, useState } from 'react';
import { vi } from 'vitest';
import { getQuery } from '../getQuery';

// Mocking useAuth
vi.mock('@clerk/clerk-react', () => ({
  useAuth: () => ({
    getToken: () => 'token'
  })
}));

vi.stubGlobal('fetch', () => Promise.resolve({ json: () => 'data', ok: true }));

// Mocking useQuery
vi.mock('@tanstack/react-query', () => ({
  useQuery: (obj) => {
    const [data, setData] = useState(null);
    useEffect(() => {
      obj.queryFn().then((data) => setData(data));
    });
    return { data };
  }
}));


describe('getQuery', () => {
  it('should return data', async () => {
    const {result } = renderHook(() => getQuery('resource'));
    await act(async() => {
      await vi.waitFor(() => result.current.data !== undefined);
    })
    expect(result.current.data).toBe('data');
    
  });
});
