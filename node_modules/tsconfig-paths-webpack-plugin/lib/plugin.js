"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const TsconfigPaths = require("tsconfig-paths");
const path = require("path");
const Options = require("./options");
const Logger = require("./logger");
const createInnerCallback = require("enhanced-resolve/lib/createInnerCallback");
const getInnerRequest = require("enhanced-resolve/lib/getInnerRequest");
class TsconfigPathsPlugin {
    constructor(rawOptions = {}) {
        this.source = "described-resolve";
        this.target = "resolve";
        const options = Options.getOptions(rawOptions);
        this.extensions = options.extensions;
        const colors = new chalk_1.default.constructor({ enabled: options.colors });
        this.log = Logger.makeLogger(options, colors);
        const context = options.context || process.cwd();
        const loadFrom = options.configFile || context;
        const loadResult = TsconfigPaths.loadConfig(loadFrom);
        if (loadResult.resultType === "failed") {
            this.log.logError(`Failed to load tsconfig.json: ${loadResult.message}`);
        }
        else {
            this.log.logInfo(`tsconfig-paths-webpack-plugin: Using config file at ${loadResult.configFileAbsolutePath}`);
            this.baseUrl = options.baseUrl || loadResult.baseUrl;
            this.absoluteBaseUrl = options.baseUrl
                ? path.resolve(options.baseUrl)
                : loadResult.absoluteBaseUrl;
            this.matchPath = TsconfigPaths.createMatchPathAsync(this.absoluteBaseUrl, loadResult.paths);
        }
    }
    apply(resolver) {
        const { baseUrl } = this;
        if (!baseUrl) {
            // Nothing to do if there is no baseUrl
            this.log.logWarning("Found no baseUrl in tsconfig.json, not applying tsconfig-paths-webpack-plugin");
            return;
        }
        resolver.plugin(this.source, createPlugin(this.matchPath, resolver, this.absoluteBaseUrl, this.target, this.extensions));
    }
}
exports.TsconfigPathsPlugin = TsconfigPathsPlugin;
function createPlugin(matchPath, resolver, absoluteBaseUrl, target, extensions) {
    const fileExistAsync = createFileExistAsync(resolver.fileSystem);
    const readJsonAsync = createReadJsonAsync(resolver.fileSystem);
    return (request, callback) => {
        const innerRequest = getInnerRequest(resolver, request);
        if (!innerRequest ||
            (innerRequest.startsWith(".") || innerRequest.startsWith(".."))) {
            return callback();
        }
        matchPath(innerRequest, readJsonAsync, fileExistAsync, extensions, (err, foundMatch) => {
            if (err) {
                callback(err);
            }
            if (!foundMatch) {
                return callback();
            }
            const newRequest = Object.assign({}, request, { request: foundMatch, path: absoluteBaseUrl });
            return resolver.doResolve(target, newRequest, `Resolved request '${innerRequest}' to '${foundMatch}' using tsconfig.json paths mapping`, createInnerCallback((err2, result2) => {
                if (arguments.length > 0) {
                    return callback(err2, result2);
                }
                // don't allow other aliasing or raw request
                callback(null, null);
            }, callback));
        });
    };
}
function createReadJsonAsync(filesystem) {
    // tslint:disable-next-line:no-any
    return (path2, callback2) => {
        filesystem.readJson(path2, (err, json) => {
            // If error assume file does not exist
            if (err || !json) {
                callback2();
                return;
            }
            callback2(undefined, json);
        });
    };
}
function createFileExistAsync(filesystem) {
    return (path2, callback2) => {
        filesystem.stat(path2, (err, stats) => {
            // If error assume file does not exist
            if (err) {
                callback2(undefined, false);
                return;
            }
            callback2(undefined, stats ? stats.isFile() : false);
        });
    };
}
