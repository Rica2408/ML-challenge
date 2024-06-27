import Navbar from '@/app/components/navbar';
import { render, screen } from '@testing-library/react';

jest.mock('next/navigation', () => ({
    useParams: jest.fn(),
    useRouter: jest.fn().mockReturnValue({
        push: jest.fn(),
        replace: jest.fn(),
    }),
    useSearchParams: jest.fn().mockReturnValue({
        get: jest.fn()
    }),
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