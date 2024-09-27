import { axiosInstance } from "../ins";
import { postSchema, relatedSchema } from "./dto";

export enum POST_TYPES {
    API_DOC = "api-doc",
    BLOGS = "blogs",
    SERVICES = "services",
    USE_CASES = "use-cases"
}

export class Posts{
    /**
     * get posts related to categories
     */
    static async get(type: POST_TYPES = POST_TYPES.BLOGS){
        const { data } = await axiosInstance.get("wp/v2/posts?category_name=" + type)
        return postSchema.array().parse(data)
    }

    /*
    * this needs https://support.shareaholic.com/hc/en-us/articles/360046456752-Developers-YARPP-REST-API-for-Related-Posts
    * to be installed on the wordpress
    */
    static async getRelatedPosts(id: number){
        const { data } = await axiosInstance.get("yarpp/v1/related/" + id)
        return relatedSchema.array().parse(data)
    }
}