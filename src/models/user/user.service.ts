import { User } from "../../schema/user.schema";
import { omit } from "lodash";

export const UserService = {
    serialize: (user: User) => {
        return omit(user, "password");
    },
};