import { Db, ObjectId } from "mongodb";
import { mongoclient } from "../config/connection";

export type ProductModel = {
  _id: ObjectId | string;
  name: string;
  slug: string;
  description: string;
  excerpt: string;
  price: number;
  tags: string[];
  thumbnail: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type PaginatedResponse<T> = {
  items: T[];
  total: number;
  page: number;
  totalPages: number;
  hasMore: boolean;
};

const DATABASE_NAME = process.env.MONGODB_DBNAME;

export const getDb = async () => {
  const client = await mongoclient();
  const db: Db = client.db(DATABASE_NAME);
  return db;
};

export const getProducts = async (search?: string, page?: number, limit?: number): Promise<ProductModel[]> => {
  const db = await getDb();

  const filter = search
  ? { name: { $regex: search, $options: "i" } }
  : {};

  const skip = page && page > 1 ? (page - 1) * (limit || 10) : 0;

  const products = await db.collection("Products").find(filter).skip(skip).limit(limit || 10).toArray() as ProductModel[];

  return products
};


export const getProductBySlug = async (slug: string) => {
  const db = await getDb();

  const product = await db.collection("Products").findOne({
    slug: slug
  }) as ProductModel;
  
  return product;
};

export const getProductByName = async (name: string): Promise<ProductModel[]> => {
  const db = await getDb();

  const products = await db.collection("Products").find({
    name: { $regex: name, $options: 'i' }
  }).toArray() as ProductModel[];
  
  return products;
};

export const getProductPagination = async (
  page: number = 1,
  limit: number = 10
): Promise<PaginatedResponse<ProductModel>> => {
  const db = await getDb();
  const skip = (page - 1) * limit;

  const total = await db.collection("Products").countDocuments();

  const products = await db
    .collection("Products")
    .find({})
    .skip(skip)
    .limit(limit)
    .toArray() as ProductModel[];

  const totalPages = Math.ceil(total / limit);
  
  return {
    items: products,
    total,
    page,
    totalPages,
    hasMore: page < totalPages
  };
};