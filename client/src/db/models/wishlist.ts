import { Db, ObjectId } from "mongodb";
import { mongoclient } from "../config/connection";

export type WishlistModel = {
    _id: ObjectId,
    userId: ObjectId,
    productId: ObjectId,
    createdAt: Date,
    updatedAt: Date,
    product?: {
        _id: ObjectId,
        name: string,
        thumbnail: string,
        price: number
    }
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

export const getWishlistByUser = async (userId: ObjectId): Promise<WishlistModel[]> => {
  const db = await getDb();
  const wishlist = await db
    .collection("Wishlist")
    .aggregate([
      {
        $match: { userId }
      },
      {
        $lookup: {
          from: "Products",
          localField: "productId",
          foreignField: "_id",
          as: "product"
        }
      },
      {
        $unwind: "$product"
      }
    ])
    .toArray() as WishlistModel[];
  return wishlist;
};

export const deleteWishlist = async (id: string | ObjectId) => {
  const db = await getDb();
  const result = await db.collection("Wishlist").deleteOne({
    _id: new ObjectId(id)
  });
  return result;
};