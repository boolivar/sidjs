import { Node } from "./integrationGraph"

export class NameFormatter {

    formatNode(node: Node): string | undefined {
        let nodeName = this.formatName(node.name);
        let handlers = node.handlers?.map(h => `{ ${h.type} | ${this.formatName(h.name)} }`) ?? [];
        return handlers.length > 0 ? `{ ${[nodeName, ...handlers].join(" | ")} }` : nodeName;
    }

    formatName(name: string | undefined): string | undefined {
        return name?.replace(/\(.+/, "").replace(/^.+\./, "");
    }
}