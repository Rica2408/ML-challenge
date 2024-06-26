import IndexPage from '@/pages';
import { ProductType } from '@/pages/api/products';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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
            category: 'all',
            id: 1,
        },
    }),
}));

jest.mock('react-multi-carousel', () => ({
    __esModule: true,
    default: jest.fn().mockImplementation(({ children }) => <div>{children}</div>),
  }));


describe('Deberia desplegar productos', () => {
    it('Desplegar productos', async () => {
        render(<IndexPage products={mockProducts} />);
        await waitFor(() => expect(screen.getByText(mockProducts[0].title)).toBeInTheDocument());
        
    });

    it('Desplegar modal y agregar un nuevo producto ', async () => {
        render(<IndexPage products={mockProducts} />);
        await waitFor(() => expect(screen.getByText(mockProducts[0].title)).toBeInTheDocument());
        const addButton = screen.getByText(/Nuevo producto/i);
        expect(addButton).toBeInTheDocument();
        fireEvent.click(addButton);
        await waitFor(() => expect(screen.getByText(/Agregar nuevo producto/i)).toBeInTheDocument());
        const textFieldTitle = screen.getByLabelText(/Titulo/i);
        fireEvent.change(textFieldTitle, { target: { value: 'Product 3' } });
        expect(textFieldTitle).toHaveValue('Product 3');
        const textFieldDescription = screen.getByLabelText(/Descripcion/i);
        fireEvent.change(textFieldDescription, { target: { value: 'Description 3' } });
        expect(textFieldDescription).toHaveValue('Description 3');
        const textFieldPrice = screen.getByLabelText(/Precio/i);
        fireEvent.change(textFieldPrice, { target: { value: 3 } });
        expect(textFieldPrice).toHaveValue(3);

        const textFieldCategory = screen.getByLabelText(/Categoria/i);
        expect(textFieldCategory).toBeInTheDocument();
        userEvent.click(textFieldCategory);
        await waitFor(() => {
            expect(screen.getByText(/jewelery/i)).toBeInTheDocument()
            userEvent.click(screen.getByText(/jewelery/i));
        });

        const submitButton = screen.getByText(/Agregar/i);
        expect(submitButton).toBeInTheDocument();
        fireEvent.click(submitButton);
    });
});