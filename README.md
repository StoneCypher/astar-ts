# a-star

Quick, easy `A*`, with support for square, hex, and custom graphs, custom distance functions, and more.  Well tested
typescript, with lots of Javascript options.

Generic synchronous [A* search algorithm](http://en.wikipedia.org/wiki/A*_search_algorithm) in TypeScript.  Descends
directly from and mostly writen by [andrewrk/node-astar](https://github.com/andrewrk/node-astar).

Fork adds convenience systems so you don't have to define your own graph primitives, and converts to TypeScript and
modern norms (library is almost a decade old and still near-ideal.)

Now provided: IIFE (minified and non,) CommonJS (minified only,) and ES6 (minified and non) bundles, plus sourcemaps for IIFE non-minified and ES6 non-minified.



<br/><br/>

## Installation

```
npm install --save-dev astar-ts
```




<br/><br/>

## Usage

For `typescript` and most bundlers (rollup, webpack, parcel, rome, etc), use the `es6 module` through `import`/`export`:

```typescript
import { a_star, cartesian_2d } from 'astar-ts';
const { diagonal_distance, bounded_neighbor_no_diag_factory } = cartesian_2d;

const config = {
  start     : [18, 18],
  isEnd     : ([x,y]) => (x===0) && (y===0),
  neighbor  : cartesian_2d.infinite_neighbor_with_diag_factory(),
  distance  : cartesian_2d.diagonal_distance,
  heuristic : ([x,y]) => cartesian_2d.diagonal_distance([x,y], [0,0])
};

const result1 = a_star(config);

console.log(`result1.path.length ${result1.path.length} should be 19\n`);
console.log(`result1.path is [${result1.path.join('] [')}]\n`);
console.log(`result1.cost is ${result1.cost}\n`);
```

The expected output is

```
result1.path.length 19 should be 19

result1.path is [18,18] [17,17] [16,16] [15,15] [14,14] [13,13] [12,12] [11,11]
[10,10] [9,9] [8,8] [7,7] [6,6] [5,5] [4,4] [3,3] [2,2] [1,1] [0,0]

result1.cost is 25.45584412271572
```

Instructions are also offered for [CommonJS / require](stonecypher.github.io/astar-ts/docs/index.html)
and [iife / script tags](stonecypher.github.io/astar-ts/docs/index.html).

<br/><br/>

## Config

You must pass an object - the `config` - to `a_star()`.  This object has the
following members:

* `start`
    * The starting node for the path.
* `isEnd`
    * `function(node): bool` returns whether a node is an acceptable endpoint
* `neighbor`
    * `function(node): node[]` returns an array of neighbors for a node
* `distance`
    * `function(a, b): number` returns the distance cost between two nodes
 * `heuristic`
    * `function(node): number` returns a heuristic guess of the cost from `node`
      to an endpoint.
 * `hash`
    * `function(node): string` returns a unique string for a node. This is
     so that we can put nodes in heap and set data structures which are based
     on plain old JavaScript objects. Defaults to using `node.toString`.
 * `timeout`
    * optional limit to amount of milliseconds to search before returning null.
      Defaults to three seconds.  Pass `undefined` to disable.

The data type for nodes is unrestricted.


<br/><br/>

## Return Value

The pathfinder will return an object with three members: `status`, `path`, and `cost`.

`status` will be one of three strings:

1. `'success'` when a path is found, or
1. `'no path'` when no path exists, or
1. `'timeout'` when the pathfinder ran too long

`path` will be a path, which is an array of whatever you have provided as nodes.  The array will always contain at least
the start cell.

1. In a `success`, `path` will contain every cell from start to finish, including both start and finish.
1. In a `no path`, `path` will contain every cell from start to the closest cell the pathfinder could reach.
1. In a `timeout`, `path` will contain the best path the pathfinder could find in time, which usually won't reach the
   end.

`cost` will be the sum cost cost of every step in reaching the final cell in the `path` provided.  Cost defaults to 1
for 4-way cartesian, and `sqrt(2)` for diagonals in 8-way, but varies for other map types (hex is uniform, irregular can
be anything, game maps' cell types can be movement penalties, etc.)

```javascript
{
  status : 'success', // 'success' | 'no path' | 'timeout'
  path   : [startNode, node1, node2, ..., endNode],
  cost   : 1234.56
}
```

<br/><br/>

# Documentation

Please see the [online documentation](stonecypher.github.io/astar-ts/docs/index.html).
