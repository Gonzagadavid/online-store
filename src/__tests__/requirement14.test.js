import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from '../App';
import * as api from '../services/api';
import mockedCategoriesResult from '../__mocks__/categories';
import mockedQueryResult from '../__mocks__/query';

jest.mock('../services/api');
api.getCategories.mockImplementation(
  () => Promise.resolve(mockedCategoriesResult),
);
api.getProductsFromCategoryAndQuery.mockImplementation(
  () => Promise.resolve(mockedQueryResult),
);

describe(`14 - Limite a quantidade de produtos adicionados ao carrinho pela quantidade disponível em estoque`, () => {
  it(`Não adiciona ao carrinho mais produtos do que o disponível em
      estoque`, async () => {
    render(<App />);
    await waitFor(() => expect(api.getCategories).toHaveBeenCalled());
    fireEvent.click(screen.getAllByTestId('category')[0]);
    await waitFor(() => expect(api.getProductsFromCategoryAndQuery).toHaveBeenCalled());
    fireEvent.click(screen.getAllByTestId('product-add-to-cart')[1]);
    fireEvent.click(screen.getByTestId('shopping-cart-button'));
    await waitFor(() => expect(screen.getAllByTestId('shopping-cart-product-name')));
    expect(screen.getAllByTestId('shopping-cart-product-name')[0]).toHaveTextContent(
      mockedQueryResult.results[1].title,
    );
    expect(screen.getAllByTestId('shopping-cart-product-quantity')[0]).toHaveTextContent(
      '1',
    );
    fireEvent.click(screen.getAllByTestId('product-increase-quantity')[0]);
    fireEvent.click(screen.getAllByTestId('product-increase-quantity')[0]);
    fireEvent.click(screen.getAllByTestId('product-increase-quantity')[0]);
    expect(screen.getAllByTestId('shopping-cart-product-quantity')[0]).toHaveTextContent(
      mockedQueryResult.results[1].available_quantity,
    );
  });
});
