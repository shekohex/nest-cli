import { spawn, ChildProcess } from "child_process";
import chalk from "chalk";
import { Runner } from "./runner";
import { SchematicRunner } from "./schematic.runner";
import { NpmRunner } from "./npm.runner";
import { YarnRunner } from "./yarn.runner";

export abstract class AbstractRunner {
  constructor(private logger: any, private binary: string) {}

  public async run(command: string, collect: boolean = false, cwd: string = process.cwd()): Promise<string | null> {
    const args: string[] = [ command ];
    const options: any = {
      stdio: collect ? 'pipe' : 'inherit',
      shell: true,
      cwd: cwd
    };
    return new Promise<string | null>((resolve, reject) => {
      const child: ChildProcess = spawn(this.binary, args, options);
      if (collect) {
        child.stdout.on('data', (data) => resolve(data.toString().replace(/\r\n|\n/, '')));
      }
      child.on('close', (code) => {
        if (code === 0) {
          resolve();
        } else {
          const message = `Failed to execute command : ${ command }, see above.`;
          this.logger.error(chalk.red(message));
          reject(message);
        }
      });
    });
  }

  public static create(runner: Runner, logger: any): AbstractRunner {
    switch (runner) {
      case Runner.SCHEMATIC:
        return new SchematicRunner(logger);
      case Runner.NPM:
        return new NpmRunner(logger);
      case Runner.YARN:
        return new YarnRunner(logger);
      default:
        logger.info(chalk.yellow('[WARN] Unsupported runner'));
    }
  }
}
