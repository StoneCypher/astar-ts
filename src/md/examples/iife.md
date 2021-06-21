# IIFE

If you're in the browser and don't want to use a bundler or a module tag, you can fall back to immediately invoked
function expressions mounted on `window`.

This is generally discouraged, but can be convenient, especially with CDNs.

```javascript
<head>
  <script defer="defer" type="text/javascript" src="astar-ts.iife.js"></script>
  <script>

    const { a_star, cartesian_2d } = window.astar_ts;
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

  </script>
```
