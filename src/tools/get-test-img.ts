import axios from "axios";
import { z } from "zod";
import { BaseTool } from "./base-tool.js";

const imageResponseSchema = z.object({
  data: z.string().min(1),
});

export class GetTestImage extends BaseTool {
  name = "get_test_image";
  title = "获取测试图片";
  inputSchema = {};
  description =
    "当用户要求获取测试图片时，调用此工具返回一张可访问的测试图片地址。";

  async execute(): Promise<ReturnType<BaseTool["text"]>> {
    const imageUrl = process.env.TEST_IMAGE_URL ?? "http://dingyanlei.fun/test0";

    try {
      const response = await axios.get(imageUrl, { timeout: 5000 });
      const parsed = imageResponseSchema.safeParse(response.data);

      if (!parsed.success) {
        return this.text("测试图片接口返回格式不符合预期。", true);
      }

      return this.text(`测试图片地址：${parsed.data.data}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return this.text(
          `获取测试图片失败：${error.message || "图片服务暂时不可用"}`,
          true,
        );
      }

      return this.text("获取测试图片失败：发生未知错误。", true);
    }
  }
}
