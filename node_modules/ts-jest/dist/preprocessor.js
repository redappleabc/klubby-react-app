"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require("crypto");
var tsc = require("typescript");
var postprocess_1 = require("./postprocess");
var utils_1 = require("./utils");
function process(src, filePath, jestConfig, transformOptions) {
    if (transformOptions === void 0) { transformOptions = { instrument: false }; }
    var compilerOptions = utils_1.getTSConfig(jestConfig.globals, transformOptions.instrument);
    var isTsFile = /\.tsx?$/.test(filePath);
    var isJsFile = /\.jsx?$/.test(filePath);
    var isHtmlFile = /\.html$/.test(filePath);
    if (isHtmlFile && jestConfig.globals.__TRANSFORM_HTML__) {
        src = 'module.exports=`' + src + '`;';
    }
    var processFile = compilerOptions.allowJs === true ? isTsFile || isJsFile : isTsFile;
    if (!processFile) {
        return src;
    }
    var tsTranspiled = tsc.transpileModule(src, {
        compilerOptions: compilerOptions,
        fileName: filePath,
    });
    var tsJestConfig = utils_1.getTSJestConfig(jestConfig.globals);
    var postHook = postprocess_1.getPostProcessHook(compilerOptions, jestConfig, tsJestConfig);
    var outputText = postHook(tsTranspiled.outputText, filePath, jestConfig, transformOptions);
    var modified = utils_1.injectSourcemapHook(filePath, tsTranspiled.outputText, outputText);
    return modified;
}
exports.process = process;
function getCacheKey(fileData, filePath, jestConfigStr, transformOptions) {
    if (transformOptions === void 0) { transformOptions = { instrument: false }; }
    var jestConfig = JSON.parse(jestConfigStr);
    var tsConfig = utils_1.getTSConfig(jestConfig.globals, transformOptions.instrument);
    return crypto
        .createHash('md5')
        .update(JSON.stringify(tsConfig), 'utf8')
        .update(JSON.stringify(transformOptions), 'utf8')
        .update(fileData + filePath + jestConfigStr, 'utf8')
        .digest('hex');
}
exports.getCacheKey = getCacheKey;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlcHJvY2Vzc29yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3ByZXByb2Nlc3Nvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtCQUFpQztBQUNqQyxnQ0FBa0M7QUFFbEMsNkNBQW1EO0FBQ25ELGlDQUtpQjtBQUVqQixpQkFDRSxHQUFXLEVBQ1gsUUFBYyxFQUNkLFVBQXNCLEVBQ3RCLGdCQUEwRDtJQUExRCxpQ0FBQSxFQUFBLHFCQUF1QyxVQUFVLEVBQUUsS0FBSyxFQUFFO0lBSTFELElBQU0sZUFBZSxHQUFHLG1CQUFXLENBQ2pDLFVBQVUsQ0FBQyxPQUFPLEVBQ2xCLGdCQUFnQixDQUFDLFVBQVUsQ0FDNUIsQ0FBQztJQUVGLElBQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDMUMsSUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMxQyxJQUFNLFVBQVUsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRzVDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztRQUN4RCxHQUFHLEdBQUcsa0JBQWtCLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQztJQUN4QyxDQUFDO0lBRUQsSUFBTSxXQUFXLEdBQ2YsZUFBZSxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztJQUVyRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDakIsTUFBTSxDQUFDLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFFRCxJQUFNLFlBQVksR0FBRyxHQUFHLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRTtRQUM1QyxlQUFlLGlCQUFBO1FBQ2YsUUFBUSxFQUFFLFFBQVE7S0FDbkIsQ0FBQyxDQUFDO0lBRUgsSUFBTSxZQUFZLEdBQUcsdUJBQWUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFekQsSUFBTSxRQUFRLEdBQUcsZ0NBQWtCLENBQ2pDLGVBQWUsRUFDZixVQUFVLEVBQ1YsWUFBWSxDQUNiLENBQUM7SUFFRixJQUFNLFVBQVUsR0FBRyxRQUFRLENBQ3pCLFlBQVksQ0FBQyxVQUFVLEVBQ3ZCLFFBQVEsRUFDUixVQUFVLEVBQ1YsZ0JBQWdCLENBQ2pCLENBQUM7SUFFRixJQUFNLFFBQVEsR0FBRywyQkFBbUIsQ0FDbEMsUUFBUSxFQUNSLFlBQVksQ0FBQyxVQUFVLEVBQ3ZCLFVBQVUsQ0FDWCxDQUFDO0lBRUYsTUFBTSxDQUFDLFFBQVEsQ0FBQztBQUNsQixDQUFDO0FBeERELDBCQXdEQztBQUVELHFCQUNFLFFBQWdCLEVBQ2hCLFFBQWMsRUFDZCxhQUFxQixFQUNyQixnQkFBMEQ7SUFBMUQsaUNBQUEsRUFBQSxxQkFBdUMsVUFBVSxFQUFFLEtBQUssRUFBRTtJQUUxRCxJQUFNLFVBQVUsR0FBZSxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBRXpELElBQU0sUUFBUSxHQUFHLG1CQUFXLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUU5RSxNQUFNLENBQUMsTUFBTTtTQUNWLFVBQVUsQ0FBQyxLQUFLLENBQUM7U0FDakIsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEVBQUUsTUFBTSxDQUFDO1NBQ3hDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLEVBQUUsTUFBTSxDQUFDO1NBQ2hELE1BQU0sQ0FBQyxRQUFRLEdBQUcsUUFBUSxHQUFHLGFBQWEsRUFBRSxNQUFNLENBQUM7U0FDbkQsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ25CLENBQUM7QUFoQkQsa0NBZ0JDIn0=