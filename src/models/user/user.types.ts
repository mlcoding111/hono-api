import { InferInsertModel } from "drizzle-orm";
import { UserSchema } from "../../shcema/user.schema";

export type User = InferInsertModel<typeof UserSchema>;