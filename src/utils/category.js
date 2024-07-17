/* eslint-disable camelcase */
function completeCategory (categoryArr, category_id) {
  return categoryArr.find((category) => category.id === category_id);
}

function updateCategory (products, productIndex, categories, category_id) {
  if (category_id) {
    const category = completeCategory(categories, category_id);
    return category;
  } else {
    const category = products[productIndex].category_id;
    return category;
  }
}

export { completeCategory, updateCategory };
