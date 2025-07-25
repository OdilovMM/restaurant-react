import { serverApi } from "../../lib/config";
import axios from "axios";
import assert from "assert";
import { Definer } from "../../lib/Definer";
import {
  BoArticle,
  BoArticleInput,
  SearchArticlesObj,
  SearchMemberArticleObj,
} from "../../types/boArticle";

class CommunityApiService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  public async uploadImageToServer(image: any) {
    try {
      let form_data = new FormData();
      form_data.append("community_image", image);

      const result = await axios(`${this.path}/community/image`, {
        method: "POST",
        data: form_data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);

      const image_name: string = result.data.data;
      return image_name;
    } catch (err: any) {
      throw err;
    }
  }

  public async createArticle(data: BoArticleInput) {
    try {
      const url = `/community/create`,
        result = await axios.post(this.path + url, data, {
          withCredentials: true,
        });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);

      const article: BoArticle = result.data.data;
      return article;
    } catch (err: any) {
      throw err;
    }
  }

  public async getTargetArticles(data: SearchArticlesObj) {
    try {
      let url = `/community/target?bo_id=${data.bo_id}&page=${data.page}&limit=${data.limit}`;
      if (data.order) url += `&order=${data.order}`;

      const result = await axios.get(this.path + url, {
        withCredentials: true,
      });
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);

      const articles: BoArticle[] = result.data.data;
      return articles;
    } catch (err: any) {
      throw err;
    }
  }
  public async getMemberCommunityArticles(data: SearchMemberArticleObj) {
    try {
      let url = `/community/articles?mb_id=${data.mb_id}&page=${data.page}&limit=${data.limit}`;

      const result = await axios.get(this.path + url, {
        withCredentials: true,
      });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);

      const articles: BoArticle[] = result.data.data;
      return articles;
    } catch (err: any) {
      throw err;
    }
  }
  public async getChosenArticle(art_id: string) {
    try {
      const url = `/community/single-article/${art_id}`,
        result = await axios.get(this.path + url, {
          withCredentials: true,
        });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);

      const article: BoArticle = result.data.data;
      return article;
    } catch (err: any) {
      throw err;
    }
  }
}
export default CommunityApiService;
