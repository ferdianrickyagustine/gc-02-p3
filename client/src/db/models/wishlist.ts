import { Db, ObjectId } from "mongodb";
import { mongoclient } from "../config/connection";

export type WishlistModel = {
    _id: ObjectId,
    userId: ObjectId,
    productId: ObjectId,
    createdAt: Date,
    updatedAt: Date
}

const DATABASE_NAME = process.env.MONGODB_DBNAME;

export const getDb = async () => {
  const client = await mongoclient();
  const db: Db = client.db(DATABASE_NAME);
  return db;
};

export const addToWishlist = async (userId: ObjectId, productId: ObjectId) => {
  const db = await getDb();
  const wishlist = await db.collection("Wishlist").insertOne({
    userId,
    productId,
    createdAt: new Date(),
    updatedAt: new Date()
  });
  return wishlist;
};

export const getWishlistByUser = async (userId: ObjectId) => {
  const db = await getDb();
  const wishlist = await db
    .collection("Wishlist")
    .find({ userId })
    .toArray();
  return wishlist;
};