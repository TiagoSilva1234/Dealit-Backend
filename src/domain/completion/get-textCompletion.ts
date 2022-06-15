import { createCompletion } from "../../infrastructure/completion-repository";

export default async (input: string) => await createCompletion(input);
