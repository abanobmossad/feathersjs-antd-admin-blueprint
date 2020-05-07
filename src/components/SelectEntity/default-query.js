export const users = (keyword) => ({
  $or: [
    { email: { $ilike: `${keyword}%` } },
    { username: { $ilike: `${keyword}%` } },
  ],
});

export default function (ref) {
  switch (ref) {
    case 'users':
      return users;
    default:
      throw new Error('Query not found');
  }
}
