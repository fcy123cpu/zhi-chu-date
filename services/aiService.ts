
import { GoogleGenAI, Type } from "@google/genai";
import { AIResponse, Task } from "../types";

/**
 * 智能规划核心入口 - 采用 Gemini 3 Pro 深度规划模型
 */
export const generateSmartSchedule = async (
  prompt: string, 
  date: string, 
  history: Task[] = []
): Promise<AIResponse> => {
  // 遵循指南：在调用前初始化 GoogleGenAI 实例，确保获取最新 API 密钥
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
  
  // 提取历史任务摘要以提供“记忆”背景，实现跨日期规律感知
  const memoryContext = history.length > 0 
    ? history.slice(-15).map(t => `- ${t.date} ${t.time}: ${t.title}`).join('\n')
    : "暂无历史记录";

  const systemInstruction = `
    你是一个极其聪明、有记忆能力的日程规划专家。
    用户会告诉你他的一天安排。你需要将其转化为结构化的 JSON 任务列表。
    
    【记忆 context】：
    这是用户过去的一些日程安排，请根据这些历史规律（例如用户习惯在什么时间锻炼或工作）来优化你的建议：
    ${memoryContext}

    【输出规则】：
    1. 必须返回 JSON 格式，包含 tasks 数组。
    2. 时间格式为 'HH:mm - HH:mm'。
    3. 根据任务描述自动判断 'isUrgent' (是否加急)。
    4. 标题简洁，描述温馨。
    示例格式：
    {
      "tasks": [
        { "time": "09:00 - 10:00", "title": "晨间锻炼", "description": "开启活力一天", "isUrgent": false }
      ]
    }
  `;

  const userContent = `目标日期: ${date}. 用户当前输入: "${prompt}"`;

  try {
    // 遵循指南：使用 gemini-3-pro-preview 处理复杂推理规划任务
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: userContent,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tasks: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  time: { type: Type.STRING, description: "任务起止时间，如 09:00 - 10:30" },
                  title: { type: Type.STRING, description: "任务简短标题" },
                  description: { type: Type.STRING, description: "任务详细描述" },
                  reminderMinutes: { type: Type.INTEGER, description: "提前提醒分钟数" },
                  isUrgent: { type: Type.BOOLEAN, description: "是否为紧急/加急任务" }
                },
                required: ["time", "title", "description"]
              }
            }
          },
          required: ["tasks"]
        }
      }
    });

    // 遵循指南：直接访问 .text 属性获取 JSON 字符串
    const jsonStr = response.text || '{"tasks":[]}';
    return JSON.parse(jsonStr) as AIResponse;
  } catch (error) {
    console.error("Gemini AI 规划失败:", error);
    throw error;
  }
};
