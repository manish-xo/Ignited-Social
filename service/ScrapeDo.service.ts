import axios from "axios";
import { SCRAPE_DO_TOKEN } from "./constants";
export class ScrapeDoService {
  async scrapeWithScrapeDo<T>(
    url: string,
  ): Promise<{ success: boolean; message?: string; data?: T }> {
    try {
      const targetUrl = encodeURIComponent(url);

      console.log("SCRAPE_DO_TOKEN value:", SCRAPE_DO_TOKEN);
      console.log("SCRAPE_DO_TOKEN length:", SCRAPE_DO_TOKEN?.length);

      const config = {
        method: "GET",
        url: `https://api.scrape.do/?token=${SCRAPE_DO_TOKEN}&url=${targetUrl}`,
        headers: {},
      };

      const response = await axios(config);

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          success: false,
          message: error.response?.data || error.message,
        };
      }

      return {
        success: false,
        message:
          error instanceof Error ? error.message : "Something went wrong",
      };
    }
  }
}

export const scrapeDoService = new ScrapeDoService();
