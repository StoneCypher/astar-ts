declare type AStarParamType<NodeType> = {
    start: NodeType;
    isEnd: (node: NodeType) => boolean;
    neighbor: (node: NodeType) => NodeType[];
    distance: (left: NodeType, right: NodeType) => number;
    heuristic: (node: NodeType) => number;
    hash?: (node: NodeType) => string;
    timeout?: number;
};
declare type AStarResultStatus = 'success' | 'no path' | 'timeout';
declare type AStarResultType<NodeType> = {
    status: AStarResultStatus;
    path: NodeType[];
    cost: number;
};
declare type InternalNode<NodeType> = {
    data: NodeType;
    f: number;
    g: number;
    h: number;
    parent?: InternalNode<NodeType>;
};
declare type Maze = {
    name: string;
    solve4: number | null;
    solve8: number | null;
    closest4?: number;
    closest8?: number;
    map: string[];
    start: [number, number];
    end: [number, number];
};
export { AStarParamType, AStarResultType, AStarResultStatus, InternalNode, Maze };
