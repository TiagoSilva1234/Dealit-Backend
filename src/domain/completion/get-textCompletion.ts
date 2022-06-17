import { createCompletion } from "../../infrastructure/completion-repository";

export default async (
  input: string
): Promise<{
  response: string;
}> => await createCompletion(input);
