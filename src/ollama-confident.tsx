import ResultView from "./api/main";
import { getPreferenceValues } from "@raycast/api";

const preferences = getPreferenceValues();
const promptTemplateFormat = new Map<string, string>([
  ["raycast_orca:3b", "orca"],
  ["raycast_llama2:7b", "llama2"],
  ["raycast_llama2:13b", "llama2"],
]);
const initalPrompt = new Map<string, string>([
  [
    "orca",
    `### System:
Act as a writer. Make the following text more confident while keeping the core idea.
    
Output only with the modified text.

### User:
`,
  ],
  [
    "llama2",
    `<s>[INST] <<SYS>>
Act as a writer. Make the following text more confident while keeping the core idea.
    
Output only with the modified text.
<</SYS>>
    
`,
  ],
]);
const endPrompt = new Map<string, string>([
  ["orca", "\n\n### Response:\n"],
  ["llama2", " [/INST]"],
]);

export default function Command(): JSX.Element {
  return ResultView(
    preferences.ollamaConfidentModel,
    initalPrompt.get(promptTemplateFormat.get(preferences.ollamaConfidentModel) as string) as string,
    endPrompt.get(promptTemplateFormat.get(preferences.ollamaConfidentModel) as string) as string,
    true
  );
}
