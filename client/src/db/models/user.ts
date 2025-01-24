import { mongoclient } from "../config/connection";
import { Db, ObjectId } from "mongodb";
import { hash } from "@/utils/bcrypt";

export type UserModel = {
  _id: ObjectId;
  name?: string;
  username: string;
  email: string;
  password: string;
};

export type UserModelCreateInput = Omit<UserModel, "_id">;

const DATABASE_NAME = process.env.MONGODB_DBNAME;

export const getDb = async () => {
  const client = await mongoclient();
  const db: Db = client.db(DATABASE_NAME);
  return db;
};

export const createUser = async (user: UserModelCreateInput) => {
  const createUser: UserModelCreateInput = {
    ...user,
    password: hash(user.password),
  };
  const db = await getDb();
  const existingUser = await db
    .collection("Users")
    .findOne({ email: user.email });
  if (existingUser) {
    throw new Error("Email is not available");
  }
  const result = await db.collection("Users").insertOne(createUser);
  return result;
};

export const findUserByEmail = async (email: string): Promise<UserModel | null> => {
  const db = await getDb();
  const user = await db.collection<UserModel>("Users").findOne({ email });
  return user
};
