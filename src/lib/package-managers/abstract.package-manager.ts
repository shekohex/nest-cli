import { AbstractRunner } from "../runners/abstract.runner";
import { join } from "path";
import { PackageManager } from "./package-manager";
import { NpmPackageManager } from "./npm.package-manager";
import { YarnPackageManager } from "./yarn.package-manager";
import { readdir } from "fs";
import chalk from "chalk";

export abstract class AbstractPackageManager {
  constructor(private runner: AbstractRunner, protected logger: any) {}
  
  public async install(directory: string): Promise<void> {
    const command = 'install --silent';
    const collect = false;
    try {
      this.logger.info(chalk.green(`Installing packages for tooling via ${ this.name }`));
      await this.runner.run(command, collect, join(process.cwd(), directory));
      this.logger.info(chalk.green(`Installed packages for tooling via ${ this.name }`));
    } catch (error) {
      const message = 'Package install failed, see above.';
      this.logger.error(chalk.red(message));
    }
  }

  public async version(): Promise<string> {
    const command = '--version';
    const collect = true;
    return this.runner.run(command, collect) as Promise<string>;
  }

  public abstract get name(): string;

  public static create(name: PackageManager, logger: any): AbstractPackageManager {
    switch (name) {
      case PackageManager.NPM:
        return new NpmPackageManager(logger);
      case PackageManager.YARN:
        return new YarnPackageManager(logger);
    }
  }

  public static async find(logger: any): Promise<AbstractPackageManager> {
    return new Promise<AbstractPackageManager>((resolve) => {
      readdir(process.cwd(), (error, files) => {
        if (error) {
          resolve(this.create(PackageManager.NPM, logger));
        } else {
          if (files.findIndex((filename) => filename === 'yarn.lock') > -1) {
            resolve(this.create(PackageManager.YARN, logger))
          } else {
            resolve(this.create(PackageManager.NPM, logger));
          }
        }
      });
    });
  }
}
