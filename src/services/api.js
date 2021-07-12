export async function getCategories() {
  const fetchCategory = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const dataCategory = await fetchCategory.json();
  return dataCategory;
}

export async function getProductsFromCategoryAndQuery() {
  const fetchCategoryAndQuery = await fetch('https://api.mercadolibre.com/sites/MLB/search?category=MLB1055&q=Motorola');
  const dataCategoryAndQuery = await fetchCategoryAndQuery.json();
  return dataCategoryAndQuery;
}
