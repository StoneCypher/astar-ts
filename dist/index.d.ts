import { version, build_time } from './generated_code/version';
import { AStarParamType, AStarResultType } from './types';
import * as cartesian_2d from './cartesian_2d';
declare function a_star<NodeType = unknown>(params: AStarParamType<NodeType>): AStarResultType<NodeType>;
export { version, build_time, a_star, cartesian_2d };
