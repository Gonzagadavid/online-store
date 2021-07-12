import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from '../App';
import * as api from '../services/api';
import mockedCategoriesResult from '../__mocks__/categories';
import mockedQueryResult from '../__mocks__/query';

jest.mock('../services/api');
api.getCategories.mockImplementation(() => Promise.resolve(mockedCategoriesResult));
api.getProductsFromCategoryAndQuery.mockImplementation(
  () => Promise.resolve(mockedQueryResult),
);

describe(`5 - Liste os produtos buscados por termos, com os dados resumidos, associados a esses termos`, () => {
  it(`Exibe todos os produtos retornados pela API, dado um determinado
      filtro`, async () => {
    render(<App />);
    fireEvent.change(screen.getByTestId('query-input'), {
      target: { value: 'livro' },
    });
    fireEvent.click(screen.getByTestId('query-button'));
    await waitFor(() => expect(api.getProductsFromCategoryAndQuery).toHaveBeenCalled());
    expect(screen.getAllByTestId('product').length).toEqual(
      mockedQueryResult.results.length,
    );
  });
});
