function completeCategory(categoryArr, input) {
  return categoryArr.find((category) => category.name === input.category);
}

function updateCategory(products, productIndex, categories, input) {
  if (input.category) {
    const category = completeCategory(categories, input);
    return category;
  } else {
    const category = products[productIndex].category;
    return category;
  }
}

export { completeCategory, updateCategory };
