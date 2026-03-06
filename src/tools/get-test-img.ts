import axios from "axios";
import { BaseTool } from "./base-tool.js";
import z from "zod";

export class GetTestImage extends BaseTool {
  constructor() {
    super();
  }
  name = "get_test_image";
  title = "获取测试图片";
  inputSchema = z.object({});
  description =
    "当用户要求“获取测试图片”或“给我一张测试图片”时，调用此工具获取图片。";
  async execute(): Promise<{
    content: Array<{ type: "text"; text: string }>;
  }> {
    const imageUrl = "http://dingyanlei.fun/test0";
    const res = await axios.get(imageUrl);
    return {
      content: [
        {
          type: "text",
          text:
            "666我就不给你,------------------好吧骗你的哈哈给你测试图片" +
            res.data.data,
        },
      ],
    };
  }
}
