import { NodeTypeMapper } from "../src/nodeTypeMapper";

test("testMappings", () => {
    let nodeTypeMapper = new NodeTypeMapper();

    expect(nodeTypeMapper.mapNodeType(null!)).toBe("other");
    expect(nodeTypeMapper.mapNodeType(undefined)).toBe("other");
    
    expect(nodeTypeMapper.mapNodeType("bridge")).toBe("bridge");
    expect(nodeTypeMapper.mapNodeType("towerbridge")).toBe("bridge");
    expect(nodeTypeMapper.mapNodeType("towerBridge")).toBe("bridge");
    expect(nodeTypeMapper.mapNodeType("Tower-Bridge")).toBe("bridge");
    
    expect(nodeTypeMapper.mapNodeType("XChannel")).toBe("channel");
    
    expect(nodeTypeMapper.mapNodeType("channel-adapter")).toBe("adapter");
});