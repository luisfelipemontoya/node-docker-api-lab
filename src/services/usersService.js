import fs from 'fs/promises';

const USERS_PATH = './data/users.json';

export const readUsers = async () => {
  const data = await fs.readFile(USERS_PATH, 'utf-8');
  return JSON.parse(data);
};

export const saveUsers = async (users) => {
  await fs.writeFile(
    USERS_PATH,
    JSON.stringify(users, null, 2)
  );
};

export const createUser = async (userData) => {
  const users = await readUsers();

  const user = {
    id: users.length + 1,
    ...userData,
  };

  users.push(user);

  await saveUsers(users);

  return user;
};
