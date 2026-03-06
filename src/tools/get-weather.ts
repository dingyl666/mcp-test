import { BaseTool } from "./base-tool.js";
import z from "zod";


export class GetWeather extends BaseTool {
  constructor() {
    super();
  }
  name = "get_weather";
  title = "获取测试天气";
  inputSchema = z.object({});
  description =
    "当用户要求“获取测试天气”或“给我测试天气”时，调用此工具获取天气。";
  async execute(args: z.infer<typeof this.inputSchema>): Promise<{
    content: Array<{ type: "text"; text: string }>;
  }> {
    return {
      content: [
        {
          type: "text",
          text: "今天天气是----------------------------你自己猜猜看",
        },
      ],
    };
  }
}   