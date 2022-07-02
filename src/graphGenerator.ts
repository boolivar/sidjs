import * as integration from "./integrationGraph";
import { NodeType } from "./nodeTypeMapper";
import { NameFormatter } from "./nameFormatter";

export type GeneratorConfig = {
    indent: string;
    newline: string;
    nodesColorScheme: string;
    linksColorScheme: string;
    nodeAttributes: Map<NodeType, object>;
}

export class GraphGenerator {
    nameFormatter: NameFormatter;

    constructor(nameFormatter = new NameFormatter()) {
        this.nameFormatter = nameFormatter;
    }

    generateLinks(links: integration.Link[], config: GeneratorConfig): string[] {
        return links.map(link => `${config.indent}${link.from} -> ${link.to}`);
    }

    generateNodes(groupType: NodeType, nodes: integration.Node[], config: GeneratorConfig): string[] {
        let attributes = config.nodeAttributes.get(groupType) ?? {};
        if (groupType === "gateway") {
            let gateways : Record<string, integration.Node[]> = {};
            nodes.forEach(node => {
                let gatewayName = node.name?.replace(/\..*/, "") ?? node.nodeId!;
                let gateway = gateways[gatewayName] = gateways[gatewayName] ?? [];
                gateway.push(node);
            });
            return Object.entries(gateways).flatMap(([name, routes]) => this.generateCluster(name, routes, attributes, config.indent));
        }
        return this.generateGraphNodes(config.indent, nodes, attributes);
    }

    generateCluster(name: string, nodes: integration.Node[], attributes: object, indent = ""): string[] {
        return [`${indent}subgraph cluster_${name} {`, `${indent + indent}label="${name}"`, ...this.generateGraphNodes(indent + indent, nodes, attributes), `${indent}}`];
    }

    private generateGraphNodes(indent: string, nodes: integration.Node[], attributes: object): string[] {
        return nodes.map(node => this.generateNode(indent, node.nodeId!, { ...attributes, label: this.nameFormatter.formatNode(node) }));
    }

    private generateNode(indent: string, nodeId: number, attributes: object): string {
        return `${indent}${nodeId} [${this.formatAttributes(attributes)}]`;
    }

    private formatAttributes(attributes: object): string {
        return Object.entries(attributes).map(([name, value]) => `${name}="${value}"`).join(" ");
    }
}