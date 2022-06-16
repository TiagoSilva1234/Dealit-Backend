import OpenAI from "openai-api";
import { dealioErrorMessages, generatePrompt } from "../utils/utils";

const apiKey = process.env.OPENAI_API_KEY;

const openai = new OpenAI(apiKey!);

export const createCompletion = async (
  input: string
): Promise<{ response: string }> => {
  const response = await openai.complete({
    engine: "curie",
    prompt: generatePrompt(input),
    maxTokens: 500,
    temperature: 0.3,
    topP: 1,
    presencePenalty: 0,
    frequencyPenalty: 0,
    bestOf: 1,
    n: 1,
    stream: false,
    stop: ["\n", "testing"],
  });
  if (response) {
    return { response: response.data.choices[0].text };
  }
  return {
    response:
      dealioErrorMessages[Math.random() * dealioErrorMessages.length + 1],
  };
};
