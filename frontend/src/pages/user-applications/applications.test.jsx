import { render, screen } from '@testing-library/react';
import { UserApplications } from './applications';

// Mocking the data
const mockData = [
  { applicant_id: 1, title: 'Company A', status: 'Pending' },
  { applicant_id: 2, title: 'Company B', status: 'Approved' },
];

// Mocking the data fetching function
vi.mock('../../dataprovider', () => ({
  getQuery: vi.fn(() => ({
    data: mockData,
    isLoading: false,
    isError: false,
  })).mockImplementationOnce(() => ({
    isLoading: true,
    isError: false,
  }))
  .mockImplementationOnce(() => ({
    isLoading: false,
    isError: true,
  }))
  .mockImplementationOnce(() => ({
    data: [],
    isLoading: false,
    isError: false,
  }))
}));

describe('UserApplications Component', () => {
  it('renders loading page when loading', () => {
    render(<UserApplications />);
    expect(screen.getAllByTestId('loading-page')).toBeDefined();
  });

});
