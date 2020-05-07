const users = (keyword) => ({
  $or: [
    { email: { $ilike: `${keyword}%` } },
    { username: { $ilike: `${keyword}%` } },
    { cellphone: { $ilike: `%${keyword}%` } },
  ],
});

const venues = (keyword) => ({
  name: { $ilike: `%${keyword}%` },
});

const vendors = (keyword) => ({
  $or: [
    { commonName: { $ilike: `${keyword}%` } },
    { officialName: { $ilike: `${keyword}%` } },
  ],
});

const countries = (keyword) => ({
  $or: [
    { name: { $ilike: `${keyword}%` } },
    { nativeName: { $ilike: `${keyword}%` } },
    { regionCode: { $ilike: `${keyword}%` } },
  ],
});

const pos = (keyword) => ({
  serialNumber: { $ilike: `${keyword}%` },
});

const currencies = (keyword) => ({
  $or: [
    { name: { $ilike: `${keyword}%` } },
    { code: { $ilike: `${keyword}%` } },
  ],
});

const Invitations = (keyword) => ({
  $or: [
    { email: { $ilike: `${keyword}%` } },
    { cellphone: { $ilike: `%${keyword}%` } },
  ],
});

export default {
  users,
  venues,
  vendors,
  currencies,
  pos,
  countries,
  Invitations,
};
