import * as integration from "./integrationGraph";
import { NodeType, NodeTypeMapper } from "./nodeTypeMapper";
import { GeneratorConfig, GraphGenerator } from "./graphGenerator";

export default class IntegrationParser {
    config: GeneratorConfig = {
        indent: "  ",
        newline: "\n",
        nodesColorScheme: "greys9",
        linksColorScheme: "greys9",
        nodeAttributes: new Map([["channel", { shape: "box" }], ["chain", { shape: "record" }], ["bridge", { shape: "plain" }], ["adapter", { shape: "rarrow" }]]),
    }

    nodeTypeMapper: NodeTypeMapper;
    graphGenerator: GraphGenerator;
    
    constructor(config: Partial<GeneratorConfig> = {}, nodeTypeMapper = new NodeTypeMapper(), graphGenerator = new GraphGenerator()) {
        this.config = {...this.config, ...config};
        this.nodeTypeMapper = new NodeTypeMapper();
        this.graphGenerator = new GraphGenerator();
    }

    convert(graph: string | integration.Graph): string {
        return this.convertGraph(typeof graph === "string" ? JSON.parse(graph) : graph);
    }

    private convertGraph(graph: integration.Graph): string {
        return [`digraph "${graph.contentDescriptor?.name}" {`,
                ...this.generateNodes(graph.nodes ?? []),
                ...this.generateLinks(graph.links ?? []),
                "}"].join(this.config.newline);
    }

    private generateNodes(nodes: integration.Node[]): string[] {
        return Object.entries(this.groupNodes(nodes)).flatMap(([group, nodes]) => this.generateNodeGroup(group, nodes));
    }

    private generateNodeGroup(group: string, nodes: integration.Node[]): string[] {
        return this.graphGenerator.generateNodes(group as NodeType, nodes, this.config);
    }

    private generateLinks(links: integration.Link[]): string[] {
        return this.graphGenerator.generateLinks(links, this.config);
    }

    private groupNodes(nodes: integration.Node[]): Record<string, integration.Node[]> {
        let groups: Record<string, integration.Node[]> = {};
        nodes.forEach(node => {
            let nodeType = this.nodeTypeMapper.mapNodeType(node.componentType);
            let group = groups[nodeType] = groups[nodeType] ?? [];
            group.push(node);
        });
        return groups;
    }
}
