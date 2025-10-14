import { UserRepository } from "./user.repository";
import { User } from "../../schema/user.schema";

export const UserService = {
    serialize: (user: User) => {
        return {
            id: user.id,
            email: user.email,
            createdAt: user.createdAt,
        };
    },
};