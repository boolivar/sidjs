import { NameFormatter } from "../src/nameFormatter"

test("testNameFormat", () => {
    let formatter = new NameFormatter();

    expect(formatter.formatName(undefined)).toBe(undefined);
    expect(formatter.formatName("")).toBe("");
    expect(formatter.formatName("aSomeName")).toBe("aSomeName");

    expect(formatter.formatName("org.bool.integration.dot.GraphvizMapper.mapNodes(java.util.List<IntegrationNode>, java.util.Map<String, List<IntegrationNode>>)")).toBe("mapNodes");
});

test("testNodeFormat", () => {
    let formatter = new NameFormatter();

    expect(formatter.formatNode({})).toBe(undefined);
    expect(formatter.formatNode({name: ""})).toBe("");
    expect(formatter.formatNode({name: "SomeName"})).toBe("SomeName");

    expect(formatter.formatNode({name: "SomeName", handlers: [{name: "java.util.Handler", type: "transformer"}]})).toBe("{ SomeName | { transformer | Handler } }");
});