import { axiosInstance } from "../ins";
import { userSchema } from "./dto";

export class User{
    static async get(id: number){
        const { data } = await axiosInstance.get("wp/v2/users/" + id)
        return userSchema.parse(data)
    }
}