
import { User } from '@/types/types';
import { getDB } from '../../services/db';

export async function getUser(userId: number) {
  const db = getDB();
  const users = db.collection<User>('users');
  
  try {
    const user = await users.findOne({ userId });

    return user;
  } catch (error) {
    console.error('Database operation failed:', error);
    return null;
  }
}

export async function createUser(user: User) {
  const db = getDB();
  const users = db.collection<User>('users');
  
  try {
    const newUser = await users.insertOne(user);
    return newUser.insertedId;
  } catch (error) {
    console.error('Database operation failed:', error);
    return null;
  }
}

export async function deleteUser(userId: number) {
  const db = getDB();
  const users = db.collection<User>('users');
  
  try {
    const user = await users.deleteOne({ userId });
    return user;
  } catch (error) {
    console.error('Database operation failed:', error);
    return null;
  }
}

export async function updateUser(userId: number, update: Partial<User>) {
  const db = getDB();
  const users = db.collection<User>('users');
  
  try {
    const user = await users.updateOne({ userId }, { $set: update });
    return user;
  } catch (error) {
    console.error('Database operation failed:', error);
    return null;
  }
}

