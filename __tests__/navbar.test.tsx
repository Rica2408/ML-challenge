import { render, screen } from '@testing-library/react';
import Navbar from '@/components/navbar';
import { useRouter } from 'next/router';

// Mocking useRouter from Next.js
jest.mock('next/router', () => ({
    useRouter: jest.fn().mockReturnValue({
        query: {
            category: 'all',
            id: '1', // Ensuring this matches the expected type (string if it's from URL)
        },
    }),
}));


jest.mock('next/navigation', () => ({
    useParams: jest.fn()
  }));


describe('Navbar', () => {
    it('Desplegar categories', () => {
        require('next/navigation').useParams.mockReturnValueOnce({ id: undefined });

        render(<Navbar />);
        expect(screen.getByText(/categorias/i)).toBeInTheDocument();
    });

    it('No deberia de desplegar las categorias', () => {
        require('next/navigation').useParams.mockReturnValueOnce({ id: 1 });

        render(<Navbar />);
        expect(screen.queryByText(/categorias/i)).not.toBeInTheDocument();
    });
});