import { AbstractPackageManager } from "./abstract.package-manager";
import { AbstractRunner } from "../runners/abstract.runner";
import { Runner } from "../runners/runner";
import chalk from "chalk";
import { PackageManager } from "./package-manager";

export class NpmPackageManager extends AbstractPackageManager {
  
  constructor(logger: any) {
    super(AbstractRunner.create(Runner.NPM, logger), logger);
  }

  public get name(): string {
    return PackageManager.NPM.toUpperCase();
  }
}