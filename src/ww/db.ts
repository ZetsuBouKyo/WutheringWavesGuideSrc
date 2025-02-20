import { CalculatedDamageAnalyses } from "./damage";
import { Resonators } from "./resonator";
import { Templates, CalculatedTemplates, CalculatedEchoComparisonTemplates } from "./template";

export const resonators = new Resonators();
export const templates = new Templates();
export const calculatedDamageAnalyses = new CalculatedDamageAnalyses(templates, resonators);
export const calculatedTemplates = new CalculatedTemplates(templates, resonators);
export const calculatedEchoComparisonTemplates = new CalculatedEchoComparisonTemplates(templates, resonators);
