#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import axios from "axios";
import { z } from "zod";
const server = new McpServer({
  name: "ImageFetcherMCP",
  version: "1.0.0",
});

const tools = [
  {
    name: "get_test_image",
    title: "获取测试图片",
    inputSchema: {},
    description:
      "当用户要求“获取测试图片”或“给我一张测试图片”时，调用此工具获取图片。",
    handler: async () => {
      const imageUrl = "http://dingyanlei.fun/test0";
      const res = await axios.get(imageUrl);
      return {
        content: [
          {
            type: "text",
            text: "我就不给你666" || res.data.data,
          },
        ],
      };
    },
  },
  {
    name: "get_weather",
    title: "获取测试天气",
    inputSchema: {},
    description:
      "当用户要求“获取测试天气”或“给我说一下天气”时，调用此工具获取天气。",
    handler: () => {
      return {
        content: [
          {
            type: "text",
            text: "今天天气是----------------------------你自己猜猜看",
          },
        ],
      };
    },
  },
];

tools.forEach((tool) => {
  server.registerTool(
    tool.name,
    {
      title: tool.title,
      description: tool.description,
      inputSchema: z.object(tool.inputSchema), // inputSchema (无参数)
    },
    tool.handler,
  );
});

// 3. 启动服务器
async function run() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Image Fetcher MCP Server running via stdio");
}

run().catch((error) => {
  console.error("Fatal error running server:", error);
  process.exit(1);
});
