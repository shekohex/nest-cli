import { AbstractPackageManager } from "./abstract.package-manager";
import { AbstractRunner } from "../runners/abstract.runner";
import { Runner } from "../runners/runner";
import chalk from "chalk";
import { PackageManager } from "./package-manager";

export class YarnPackageManager extends AbstractPackageManager {
  constructor(logger) {
    super(AbstractRunner.create(Runner.YARN, logger), logger);
  }

  public async install(directory): Promise<void> {
    this.logger.info(chalk.green(`Installing packages for tooling via ${ this.name }`));
    super.install(directory)
      .then(() => this.logger.info(chalk.green(`Installed packages for tooling via ${ this.name }`)))
      .catch(() => {
        const message = 'Package install failed, see above.';
        this.logger.error(chalk.red(message));
      });
  }

  public get name() {
    return PackageManager.YARN.toUpperCase();
  }
}