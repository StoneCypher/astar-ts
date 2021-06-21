# a-star

Quick, easy `A*`, with support for square, hex, and custom graphs, custom distance functions, and more.  Well tested
typescript, with lots of Javascript options.

Generic synchronous [A* search algorithm](http://en.wikipedia.org/wiki/A*_search_algorithm) in TypeScript.  Descends
directly from and mostly writen by [andrewrk/node-astar](https://github.com/andrewrk/node-astar).

Fork adds convenience systems so you don't have to define your own graph primitives, and converts to TypeScript and
modern norms (library is almost a decade old and still near-ideal.)

Now provided: IIFE (minified and non,) CommonJS (minified only,) and ES6 (minified and non) bundles, plus sourcemaps for IIFE non-minified and ES6 non-minified.



<br/><br/>

## Usage

```typescript
import { astar, cartesian_2d } from 'astar-ts';
const  { diagonal_distance, bounded_neighbor_no_diag_factory } = cartesian_2d;

const path = aStar({
  start     : [1,1],
  isEnd     : ([x,y]) => ((x === 18) && (y === 18) ),
  neighbor  : bounded_neighbor_no_diag_factory(20,20),
  distance  : diagonal_distance,
  heuristic : diagonal_distance
});

console.log(path);
```

The expected output is

```

```

If you're in `node`, instead of `import`, you can

```javascript
const astar_ts = require('astar-ts');
const { astar, cartesian_2d } = astar_ts;
```

And then the rest will work as previously.

## Documentation

`aStar(options)`

### Return Value

Returns an object that looks like this:

```js
{
  status: 'success', // one of ['success', 'noPath', 'timeout']
  path: [startNode, node1, node2, ..., endNode],
  cost: cost, // cost of path
}
```

If `status` is:

 * `success` - a path was found and `path` is an array of nodes including start
   and end.
 * `noPath` - there is no path from start to end. `path` is the path to the
   closest node to end that could be found.
 * `timeout` - no path was found in the allotted time. `path` is the path to
   the closest node that could be found in the allotted time.

### options accepted

 * `start` - the start node
 * `isEnd` - function(node) that returns whether a node is an acceptable end
 * `neighbor` - function(node) that returns an array of neighbors for a node
 * `distance` - function(a, b) that returns the distance cost between two
   nodes
 * `heuristic` - function(node) that returns a heuristic guess of the cost
   from `node` to an end.
 * `hash` - function(node) that returns a unique string for a node. this is
   so that we can put nodes in heap and set data structures which are based
   on plain old JavaScript objects. Defaults to using `node.toString`.
 * `timeout` - optional limit to amount of milliseconds to search before
   returning null.

The data type for nodes is unrestricted.
