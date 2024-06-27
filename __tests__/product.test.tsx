
import { ProductType } from '@/app/api/products/route';
import ProductDetails from '@/app/product/[id]/page';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';

jest.mock('next/navigation', () => ({
    useParams: jest.fn().mockReturnValue({ id: '1' }),
    useRouter: jest.fn().mockReturnValue({
        push: jest.fn(),
        replace: jest.fn(),
    }),
    useSearchParams: jest.fn().mockReturnValue({
        get: jest.fn()
    }),
}));

const mockProducts: ProductType[] = [
    {
        id: 1,
        title: 'Product 1',
        description: 'Description 1',
        price: 1,
        category: 'Category 1',
        image: 'Image 1',
    },
    {
        id: 2,
        title: 'Product 2',
        description: 'Description 2',
        price: 2,
        category: 'Category 2',
        image: 'Image 2',
    },
];

beforeAll(() => {
    fetchMock.enableMocks();
});

beforeEach(() => {
    fetchMock.resetMocks();
});

describe('Deberia desplegar productos', () => {
    it('Desplegar detalles del producto', async () => {
        fetchMock.mockResponseOnce(JSON.stringify(mockProducts[0]));
        require('next/navigation').useParams.mockReturnValueOnce({ id: 1 });
        await act(async () => {
            render(<ProductDetails />);
        });
        const price = screen.getByLabelText(/Precio/i);
        const title = screen.getByLabelText(/Titulo/i);

        expect(price).toBeInTheDocument()
        expect(title).toBeInTheDocument()
        expect(price).toHaveValue(mockProducts[0].price);
        expect(title).toHaveValue(mockProducts[0].title);
    });

    it('Mostrar vista para editar y aprimir el boton de cancelar', async () => {
        fetchMock.mockResponseOnce(JSON.stringify(mockProducts[0]));

        await act(async () => {
            render(<ProductDetails />);
        });
        await waitFor(() => {
            const editButton = screen.getByText(/Editar/i);
            expect(editButton).toBeInTheDocument();
            fireEvent.click(editButton);
        });

        await waitFor(() => {
            const price = screen.getByLabelText(/Precio/i);
            expect(price).toBeInTheDocument()
            expect(price).toHaveValue(mockProducts[0].price);
            fireEvent.change(price, { target: { value: 5 } });
            expect(price).toHaveValue(5);
            const cancelButton = screen.getByText(/Cancelar/i);
            expect(cancelButton).toBeVisible();
            fireEvent.click(cancelButton);
            expect(price).toHaveValue(mockProducts[0].price);
        });
    });

    it('Mostrar vista para editar y aprimir el boton de guardar', async () => {
        fetchMock.mockResponseOnce(JSON.stringify(mockProducts[0]));
        await act(async () => {
            render(<ProductDetails />);
        });
        await waitFor(() => {
            const editButton = screen.getByText(/Editar/i);
            expect(editButton).toBeInTheDocument();
            fireEvent.click(editButton);
        });

        const price = screen.getByLabelText(/Precio/i);
        expect(price).toBeInTheDocument()
        fireEvent.change(price, { target: { value: 5 } });
        expect(price).toHaveValue(5);

        const saveButton = screen.getByText(/Guardar/i);
        expect(saveButton).toBeVisible();
        fireEvent.click(saveButton);

        await waitFor(() => {
            expect(price).toHaveValue(5);
        });
    });
});