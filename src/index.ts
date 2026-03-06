#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { GetTestImage } from "./tools/get-test-img.js";
import { GetWeather } from "./tools/get-weather.js";

const server = new McpServer({
  name: "MyTestMCP",
  version: "1.0.0",
});

new GetTestImage().register(server);

new GetWeather().register(server);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Image Fetcher MCP Server running via stdio");
}

main().catch((error) => {
  console.error("Fatal error running server:", error);
  process.exit(1);
});
