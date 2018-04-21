import { AbstractPackageManager } from "./abstract.package-manager";
import { AbstractRunner } from "../runners/abstract.runner";
import { Runner } from "../runners/runner";
import chalk from "chalk";
import { PackageManager } from "./package-manager";

export class YarnPackageManager extends AbstractPackageManager {
  constructor(logger) {
    super(AbstractRunner.create(Runner.YARN, logger), logger);
  }

  public get name() {
    return PackageManager.YARN.toUpperCase();
  }
}