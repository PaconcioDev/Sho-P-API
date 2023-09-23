function completeCategory(categoryArr, input) {
  return categoryArr.find((category) => category.name === input.category);
}

export { completeCategory };