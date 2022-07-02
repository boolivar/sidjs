export type NodeType = keyof typeof NodeTypes | "other";
        
enum NodeTypes {
    adapter,
    bridge,
    chain,
    channel,
    gateway,
    activator,
}

export class NodeTypeMapper {
    mapNodeType(componentType: string | undefined): NodeType {
        return (Object.values(NodeTypes) as NodeType[])
                .find(nodeType => componentType?.toLowerCase().endsWith(nodeType)) ?? "other";
    }
}