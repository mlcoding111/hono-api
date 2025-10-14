import { InferInsertModel } from "drizzle-orm";
import { UserSchema } from "../../schema/user.schema";

export type User = InferInsertModel<typeof UserSchema>;