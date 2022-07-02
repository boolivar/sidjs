import * as integration from "../src/integrationGraph";
import * as fs from "fs";

test("testJson", () => {
    const data = fs.readFileSync("tests/spring-1.2.json", "utf-8");
    const integrationGraph: integration.Graph = JSON.parse(data);

    expect(integrationGraph).toHaveProperty("contentDescriptor");
    expect(integrationGraph).toHaveProperty("contentDescriptor.name", "myAppName:1.0");
    expect(integrationGraph.nodes?.length).toBe(3);
    expect(integrationGraph.links?.length).toBe(1);
});