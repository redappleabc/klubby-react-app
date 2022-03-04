"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require("crypto");
var fs = require("fs");
var fsExtra = require("fs-extra");
var path = require("path");
var tsc = require("typescript");
function getTSJestConfig(globals) {
    return globals && globals['ts-jest'] ? globals['ts-jest'] : {};
}
exports.getTSJestConfig = getTSJestConfig;
function formatTscParserErrors(errors) {
    return errors.map(function (s) { return JSON.stringify(s, null, 4); }).join('\n');
}
function readCompilerOptions(configPath) {
    configPath = path.resolve(configPath);
    var loaded = tsc.readConfigFile(configPath, function (file) {
        var read = tsc.sys.readFile(file);
        if (!read) {
            throw new Error("ENOENT: no such file or directory, open '" + configPath + "'");
        }
        return read;
    });
    if (loaded.error) {
        throw new Error(JSON.stringify(loaded.error, null, 4));
    }
    var basePath = path.dirname(configPath);
    var parsedConfig = tsc.parseJsonConfigFileContent(loaded.config, tsc.sys, basePath);
    if (parsedConfig.errors.length > 0) {
        var formattedErrors = formatTscParserErrors(parsedConfig.errors);
        throw new Error("Some errors occurred while attempting to read from " + configPath + ": " + formattedErrors);
    }
    return parsedConfig.options;
}
function getStartDir() {
    var grandparent = path.resolve(__dirname, '..', '..');
    if (grandparent.endsWith('/node_modules')) {
        return process.cwd();
    }
    return '.';
}
function getPathToClosestTSConfig(startDir, previousDir) {
    if (!startDir) {
        return getPathToClosestTSConfig(getStartDir());
    }
    var tsConfigPath = path.join(startDir, 'tsconfig.json');
    var startDirPath = path.resolve(startDir);
    var previousDirPath = path.resolve(previousDir || '/');
    if (startDirPath === previousDirPath || fs.existsSync(tsConfigPath)) {
        return tsConfigPath;
    }
    return getPathToClosestTSConfig(path.join(startDir, '..'), startDir);
}
function getTSConfigPathFromConfig(globals) {
    var defaultTSConfigFile = getPathToClosestTSConfig();
    if (!globals) {
        return defaultTSConfigFile;
    }
    var tsJestConfig = getTSJestConfig(globals);
    if (tsJestConfig.tsConfigFile) {
        return tsJestConfig.tsConfigFile;
    }
    return defaultTSConfigFile;
}
function mockGlobalTSConfigSchema(globals) {
    var configPath = getTSConfigPathFromConfig(globals);
    return { 'ts-jest': { tsConfigFile: configPath } };
}
exports.mockGlobalTSConfigSchema = mockGlobalTSConfigSchema;
var tsConfigCache = {};
function getTSConfig(globals, collectCoverage) {
    if (collectCoverage === void 0) { collectCoverage = false; }
    var configPath = getTSConfigPathFromConfig(globals);
    var skipBabel = getTSJestConfig(globals).skipBabel;
    var tsConfigCacheKey = JSON.stringify([
        skipBabel,
        collectCoverage,
        configPath,
    ]);
    if (tsConfigCacheKey in tsConfigCache) {
        return tsConfigCache[tsConfigCacheKey];
    }
    var config = readCompilerOptions(configPath);
    delete config.sourceMap;
    config.inlineSourceMap = true;
    config.inlineSources = true;
    delete config.outDir;
    if (configPath === path.join(getStartDir(), 'tsconfig.json')) {
        config.module = tsc.ModuleKind.CommonJS;
    }
    config.module = config.module || tsc.ModuleKind.CommonJS;
    config.jsx = config.jsx || tsc.JsxEmit.React;
    if (config.allowSyntheticDefaultImports && !skipBabel) {
        config.module = tsc.ModuleKind.ES2015;
    }
    tsConfigCache[tsConfigCacheKey] = config;
    return config;
}
exports.getTSConfig = getTSConfig;
function cacheFile(jestConfig, filePath, src) {
    if (!jestConfig.testRegex || !filePath.match(jestConfig.testRegex)) {
        var outputFilePath = path.join(jestConfig.cacheDirectory, '/ts-jest/', crypto
            .createHash('md5')
            .update(filePath)
            .digest('hex'));
        fsExtra.outputFileSync(outputFilePath, src);
    }
}
exports.cacheFile = cacheFile;
function injectSourcemapHook(filePath, typeScriptCode, src) {
    var start = src.length > 12 ? src.substr(1, 10) : '';
    var filePathParam = JSON.stringify(filePath);
    var codeParam = JSON.stringify(typeScriptCode);
    var sourceMapHook = "require('ts-jest').install(" + filePathParam + ", " + codeParam + ")";
    return start === 'use strict'
        ? "'use strict';" + sourceMapHook + ";" + src
        : sourceMapHook + ";" + src;
}
exports.injectSourcemapHook = injectSourcemapHook;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQkFBaUM7QUFDakMsdUJBQXlCO0FBQ3pCLGtDQUFvQztBQUNwQywyQkFBNkI7QUFDN0IsZ0NBQWtDO0FBR2xDLHlCQUFnQyxPQUFZO0lBQzFDLE1BQU0sQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUNqRSxDQUFDO0FBRkQsMENBRUM7QUFFRCwrQkFBK0IsTUFBd0I7SUFDckQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQTFCLENBQTBCLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDaEUsQ0FBQztBQUVELDZCQUE2QixVQUFrQjtJQUM3QyxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUd0QyxJQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsY0FBYyxDQUFDLFVBQVUsRUFBRSxVQUFBLElBQUk7UUFDaEQsSUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFJcEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ1YsTUFBTSxJQUFJLEtBQUssQ0FDYiw4Q0FBNEMsVUFBVSxNQUFHLENBQzFELENBQUM7UUFDSixDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNkLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDakIs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