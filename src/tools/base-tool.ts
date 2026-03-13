import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

export type ToolResponse = CallToolResult;

type ToolArgs<TSchema extends z.ZodRawShape> = z.infer<z.ZodObject<TSchema>>;

export abstract class BaseTool<TSchema extends z.ZodRawShape = z.ZodRawShape> {
  abstract name: string;
  abstract title: string;
  abstract description: string;
  abstract inputSchema: TSchema;

  register(server: McpServer) {
    const handler = (async (args: unknown, _extra: unknown) =>
      this.execute(args as ToolArgs<TSchema>)) as Parameters<
      McpServer["registerTool"]
    >[2];

    server.registerTool(
      this.name,
      {
        title: this.title,
        inputSchema: this.inputSchema,
        description: this.description,
      },
      handler,
    );
  }

  protected text(text: string, isError = false): ToolResponse {
    return {
      content: [{ type: "text", text }],
      ...(isError ? { isError: true } : {}),
    };
  }

  abstract execute(args: ToolArgs<TSchema>): Promise<ToolResponse>;
}
