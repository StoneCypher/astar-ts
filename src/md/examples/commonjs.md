# CommonJS

If you're in `node`, instead of `import`, you can use `CommonJS` (CJS) instead
of `es6` `import`/`export`:

```javascript
const astar_ts = require('astar-ts');
const { a_star, cartesian_2d } = astar_ts;
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
