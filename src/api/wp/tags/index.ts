import { axiosInstance } from "../ins";
import { tagSchema } from "./dto";

export class Tags{
    static async get(id: number){
        const { data } = await axiosInstance.get("wp/v2/tags/" + id)
        return tagSchema.parse(data)
    }

    static async from(id: number[]){
        return Promise.all(id.map(async v => Tags.get(v)))
    }
}