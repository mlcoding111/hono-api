import {
  Model,
  Document,
  FilterQuery,
  UpdateQuery,
  QueryOptions,
} from "mongoose";
import PaginationOptions from "../interfaces/pagination.interface";
import SortOptions from "../interfaces/sort.interface";

export default class BaseRepository<T extends Model<Document>> {
  private model: Model<T>;
  constructor(model: Model<T>) {
    this.model = model;
  }

  async findAll(
    query: FilterQuery<T> = {},
    options: QueryOptions<T> = {}
  ): Promise<T[]> {
    return await this.model.find(query, options).exec();
  }

  async find(
    query: FilterQuery<T> = {},
    paginationOptions: PaginationOptions = { page: 1, limit: 10 },
    sortOptions: SortOptions = { createdAt: 1 }
  ): Promise<{ data: T[]; total: number; page: number; limit: number }> {
    const { page, limit } = paginationOptions;
    const skip = (page - 1) * limit;
    const total = await this.model.countDocuments(query).exec();
    const data = await this.model
      .find(query)
      .skip(skip)
      .limit(limit)
      .sort(sortOptions)
      .exec();
    return { data, total, page, limit };
  }

  async findById(id: string): Promise<T | null> {
    return await this.model.findById(id).exec();
  }

  async create(data: Partial<T>): Promise<T> {
    return (await this.model.create(data)).save();
  }

  async update(
    id: string,
    updateData: UpdateQuery<T>,
    options: QueryOptions<T>
  ): Promise<T | null> {
    return await this.model.findByIdAndUpdate(id, updateData, options).exec();
  }

  async delete(id: string): Promise<T | null> {
    return await this.model.findByIdAndDelete(id).exec();
  }

  async countDocuments(query: FilterQuery<T>): Promise<number> {
    return await this.model.countDocuments(query).exec();
  }

  async findOne(query: FilterQuery<T>): Promise<T | null> {
    return await this.model.findOne(query);
  }
}
