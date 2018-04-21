import { GenerateCommand } from "./generate.command";

export const load = (program) => {
  new GenerateCommand().addTo(program);
};
