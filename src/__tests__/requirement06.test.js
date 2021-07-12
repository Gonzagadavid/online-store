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

describe('6 - Selecione uma categoria e mostre somente os produtos daquela categoria', () => {
  it(`Filtra corretamente os produtos de uma página para exibir somente os daquela
      categoria`, async () => {
    render(<App />);
    await waitFor(() => expect(api.getCategories).toHaveBeenCalled());
    fireEvent.click(screen.getAllByTestId('category')[0]);
    await waitFor(() => expect(api.getProductsFromCategoryAndQuery).toHaveBeenCalled());
    expect(screen.getAllByTestId('product').length).toEqual(
      mockedQueryResult.results.length,
    );
  });
});
