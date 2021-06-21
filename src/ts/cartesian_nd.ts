
function euclidean_distance(a: number[], b: number[]): number {

  if (a.length === 0)        { throw new RangeError('Need at least one dimension'); }
  if (b.length !== b.length) { throw new RangeError('A and B need same dimension'); }

  const deltas = a.map( (ai, i) => ai - (b[i] || 0) )
                  .map( d       => d*d              );

  return Math.sqrt( deltas.reduce( (a,c) => a+c, 0 ) );

}






function manhattan_distance(a: number[], b: number[]): number {

  if (a.length === 0)        { throw new RangeError('Need at least one dimension'); }
  if (b.length !== b.length) { throw new RangeError('A and B need same dimension'); }

  const deltas = a.map( (ai, i) => ai - (b[i] || 0) );

  return deltas.reduce( (a,c) => a+c, 0 );

}





// function bounded_neighbor_no_diag_factory(bound: number[]) {

//   return function([cx, cy]: [cx: number, cy: number]) {

//     if ( (!(Number.isInteger(cx))) || (!(cx >= 0)) ) { throw new RangeError('`cx` must be a non-negative integer'); }
//     if ( (!(Number.isInteger(cy))) || (!(cy >= 0)) ) { throw new RangeError('`cy` must be a non-negative integer'); }

//     const out = [];

//     if (cx > 0)           { out.push([ cx-1, cy   ]); }
//     if (cy > 0)           { out.push([ cx,   cy-1 ]); }
//     if (cx < (x_bound-1)) { out.push([ cx+1, cy   ]); }
//     if (cx < (y_bound-1)) { out.push([ cx,   cy+1 ]); }

//     return out;

//   }

// }





// function bounded_neighbor_with_diag_factory(x_bound: number, y_bound: number) {

//   return function([cx, cy]: [cx: number, cy: number]) {

//     if ( (!(Number.isInteger(cx))) || (!(cx >= 0)) ) { throw new RangeError('`cx` must be a non-negative integer'); }
//     if ( (!(Number.isInteger(cy))) || (!(cy >= 0)) ) { throw new RangeError('`cy` must be a non-negative integer'); }

//     const out = [];

//     const sl = cx > 0,
//           sr = cx < (x_bound-1),
//           st = cy > 0,
//           sb = cy < (y_bound-1);

//     if (sl)       { out.push([ cx-1, cy   ]); }
//     if (st)       { out.push([ cx,   cy-1 ]); }
//     if (sr)       { out.push([ cx+1, cy   ]); }
//     if (sb)       { out.push([ cx,   cy+1 ]); }

//     if (sl && st) { out.push([ cx-1, cy-1 ]); }
//     if (sl && sb) { out.push([ cx-1, cy+1 ]); }
//     if (sr && st) { out.push([ cx+1, cy-1 ]); }
//     if (sr && sb) { out.push([ cx+1, cy+1 ]); }

//     return out;

//   }

// }





// function infinite_neighbor_no_diag_factory() {

//   return function([cx, cy]: [cx: number, cy: number]) {

//     if (!( Number.isInteger(cx) )) { throw new RangeError('`cx` must be an integer'); }
//     if (!( Number.isInteger(cy) )) { throw new RangeError('`cy` must be an integer'); }

//     const out = [];

//     out.push([ cx-1, cy   ]);
//     out.push([ cx,   cy-1 ]);
//     out.push([ cx+1, cy   ]);
//     out.push([ cx,   cy+1 ]);

//     return out;

//   }

// }





// function infinite_neighbor_with_diag_factory() {

//   return function([cx, cy]: [cx: number, cy: number]) {

//     if (!( Number.isInteger(cx) )) { throw new RangeError('`cx` must be an integer'); }
//     if (!( Number.isInteger(cy) )) { throw new RangeError('`cy` must be an integer'); }

//     const out = [];

//     out.push([ cx-1, cy   ]);
//     out.push([ cx,   cy-1 ]);
//     out.push([ cx+1, cy   ]);
//     out.push([ cx,   cy+1 ]);

//     out.push([ cx-1, cy-1 ]);
//     out.push([ cx-1, cy+1 ]);
//     out.push([ cx+1, cy-1 ]);
//     out.push([ cx+1, cy+1 ]);

//     return out;

//   }

// }





export {

  euclidean_distance,
  euclidean_distance as diagonal_distance,
  euclidean_distance as crow_distance,

  manhattan_distance,
  manhattan_distance as rectilinear_distance,
  manhattan_distance as grid_distance,

  // bounded_neighbor_no_diag_factory,
  // bounded_neighbor_with_diag_factory,

  // infinite_neighbor_no_diag_factory,
  // infinite_neighbor_with_diag_factory

};
