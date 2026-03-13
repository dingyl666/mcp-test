import { z } from "zod";
import { BaseTool } from "./base-tool.js";

export class GetWeather extends BaseTool {
  name = "get_weather";
  title = "获取测试天气";
  inputSchema = {};
  description =
    "当用户要求获取测试天气时，调用此工具返回一个示例天气结果。";

  async execute(): Promise<ReturnType<BaseTool["text"]>> {
    return this.text("测试天气：晴，25°C。");
  }
}
