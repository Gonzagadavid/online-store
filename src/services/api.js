export async function getCategories() {
  const fetchCategory = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const dataCategory = await fetchCategory.json();
  return dataCategory;
}

export async function getProductsFromCategoryAndQuery(category, query) {
  let url = '';
  if (query) url = `https://api.mercadolibre.com/sites/MLB/search?q=$${query}`;
  if (category) url = `https://api.mercadolibre.com/sites/MLB/search?category=$${category}`;
  if (category && query) url = `https://api.mercadolibre.com/sites/MLB/search?category=${category}&q=${query}`;
  const fetchCategoryAndQuery = await fetch(url);
  const dataCategoryAndQuery = await fetchCategoryAndQuery.json();
  return dataCategoryAndQuery;
}
