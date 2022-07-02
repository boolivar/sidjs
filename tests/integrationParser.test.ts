import IntegrationParser from "../src/integrationParser";
import * as fs from "fs";

test("testParser", () => {
    const parser = new IntegrationParser();
    const data = fs.readFileSync("tests/spring-1.2.json", "utf-8");
    
    let result = parser.convert(data);
    expect(result).toMatch(/digraph "myAppName:1\.0" {[\s\S]+}/);
});