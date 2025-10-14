import { SerializedUserSchema, User } from "../../schema/user.schema";
import { TSerializedUser } from "../../schema/user.schema";

export const UserService = {
  /**
   * Serialize a user
   * @param user - User
   * @returns SerializedUser
   */
  serialize: (user: User): TSerializedUser => {
    return SerializedUserSchema.parse(user);
  },
};
