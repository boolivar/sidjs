export type Graph = Partial<{
    contentDescriptor: ContentDescriptor;
    nodes: Node[];
    links: Link[];
}>

export type ContentDescriptor = Partial<{
    name: string;
    provider: string;
    providerVersion: string;
    providerFormatVersion: string;
}>

export type Node = Partial<{
    nodeId: number;
    name: string;
    componentType: string;
    integrationPatternType: string;
    integrationPatternCategory: string;
    input: string;
    output: string;
    routes: string[];
    handlers: Handler[];
    properties: Record<string, string>;
}>

export type Link = Partial<{
    from: number;
    to: number;
    type: string;
}>

export type Handler = Partial<{
    name: string;
    type: string;
}>