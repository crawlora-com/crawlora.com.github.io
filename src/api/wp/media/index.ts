import { axiosInstance } from "../ins";
import { mediaSchema } from "./dto";

export class Media{
    static async get(id: number){
        const { data } = await axiosInstance.get("wp/v2/media/" + id)
        return mediaSchema.parse(data)
    }
}