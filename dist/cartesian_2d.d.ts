declare function euclidean_distance([ax, ay]: [ax: number, ay: number], [bx, by]: [bx: number, by: number]): number;
declare function manhattan_distance([ax, ay]: [ax: number, ay: number], [bx, by]: [bx: number, by: number]): number;
declare function bounded_neighbor_no_diag_factory(x_bound: number, y_bound: number): ([cx, cy]: [cx: number, cy: number]) => [number, number][];
declare function bounded_neighbor_with_diag_factory(x_bound: number, y_bound: number): ([cx, cy]: [cx: number, cy: number]) => [number, number][];
declare function infinite_neighbor_no_diag_factory(): ([cx, cy]: [cx: number, cy: number]) => [number, number][];
declare function infinite_neighbor_with_diag_factory(): ([cx, cy]: [cx: number, cy: number]) => [number, number][];
export { euclidean_distance, euclidean_distance as diagonal_distance, euclidean_distance as crow_distance, manhattan_distance, manhattan_distance as rectilinear_distance, manhattan_distance as grid_distance, bounded_neighbor_no_diag_factory, bounded_neighbor_with_diag_factory, infinite_neighbor_no_diag_factory, infinite_neighbor_with_diag_factory };
