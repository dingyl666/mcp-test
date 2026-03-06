import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { z } from "zod";

export abstract class BaseTool {
  abstract name: string;
  abstract description: string;
  abstract inputSchema: z.ZodObject<any>;

  register(server: McpServer) {
    server.registerTool(
      this.name,
      {
        title: this.name,
        inputSchema: this.inputSchema,
        description: this.description,
      },
      this.execute.bind(this),
    );
  }

  abstract execute(args: z.infer<typeof this.inputSchema>): Promise<{
    content: Array<{ type: "text"; text: string }>;
  }>;
}
