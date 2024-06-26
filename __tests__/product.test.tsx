import { ProductType } from '@/pages/api/products';
import ProductDetails from '@/pages/product/[id]';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

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

jest.mock('next/router', () => ({
    useRouter: jest.fn().mockReturnValue({
        query: {
            catalog: 'all',
            id: 1,
        },
    }),
}));

jest.mock('react-multi-carousel', () => ({
    __esModule: true,
    default: jest.fn().mockImplementation(({ children }) => <div>{children}</div>),
}));


describe('Deberia desplegar productos', () => {
    it('Desplegar detalles del producto', async () => {
        render(<ProductDetails product={mockProducts[0]} />);

        const price = screen.getByLabelText(/Precio/i);
        const title = screen.getByLabelText(/Titulo/i);

        expect(price).toBeInTheDocument()
        expect(title).toBeInTheDocument()
        expect(price).toHaveValue(mockProducts[0].price);
        expect(title).toHaveValue(mockProducts[0].title);
    });

    it('Mostrar vista para editar y aprimir el boton de cancelar', async () => {
        render(<ProductDetails product={mockProducts[0]} />);

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
        render(<ProductDetails product={mockProducts[0]} />);

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