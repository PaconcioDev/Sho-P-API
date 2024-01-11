function isDuplicatePhoneOrEmail({ usersArr, phone, email }) {
  if (phone && usersArr.some((user) => user.phone === phone)) return "phone";
  if (email && usersArr.some((user) => user.email === email)) return "email";
  return null;
}

export { isDuplicatePhoneOrEmail };
