import * as bcrypt from 'bcrypt';
import * as crypto from 'node:crypto';
import * as _ from 'lodash';

import { User } from './user.interface';
import { readDatabase, writeDatabase } from '../db';

export async function createUser(data: Omit<User, '_id'>): Promise<User> {
  const users = await readDatabase();

  if (users.some((u: User) => u.email === data.email)) {
    throw new Error('Email already exists!');
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const newUser = {
    _id: crypto.randomUUID(),
    username: data.username,
    email: data.email,
    password: hashedPassword
  };
  users.push(newUser);

  await writeDatabase(users);

  return newUser;
};

export async function getUserByEmail(data: Omit<User, '_id' | 'username'>): Promise<User> {
  const users = await readDatabase();

  const user = users.find((u: User) => u.email === data.email);
  if (!user) {
    throw new Error('Invalid credentials!');
  }

  const isMatch = await bcrypt.compare(data.password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials!');
  }

  return user;
};

export async function getUserById(id: string): Promise<User> {
  const users = await readDatabase();

  const user = users.find((u: User) => u._id === id);
  if (!user) {
    throw new Error('User doesn\'t exists!');
  }

  return user;
}

export async function deleteUserById(id: string): Promise<object[]> {
  const users = await readDatabase();

  const filteredDb = users.filter((u: User) => u._id !== id);

  await getUserById(id);

  await writeDatabase(filteredDb);

  return filteredDb;
}

export async function updateUser(id: string, data): Promise<User> {
  const users = await readDatabase();

  let flag = true;

  for (const currUser of users) {
    if (currUser._id === id) {
      Object.assign(currUser, _.omit(data, ['_id', 'password']));

      flag = true;
      break;
    } else {
      flag = false;
    }
  }

  if (!flag) {
    throw new Error('User doesn\'t exists!');
  }

  await writeDatabase(users);

  return users;
}

export async function getUsers(): Promise<object[]> {
  const allUsers = await readDatabase();

  return allUsers;
}
