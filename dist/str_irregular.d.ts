import { StrIrregularList } from './types';
declare function edge_name(l: string, r: string): string;
declare function from_edges(edgelist: StrIrregularList): {
    mesh: Map<string, number>;
    neighbor_lists: Map<string, Set<string>>;
    neighbor: (n: string) => string[];
    distance: (l: string, r: string) => number;
};
export { from_edges, edge_name };
