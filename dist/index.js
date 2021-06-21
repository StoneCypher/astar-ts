"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartesian_2d = exports.a_star = void 0;
var cartesian_2d = __importStar(require("./cartesian_2d"));
exports.cartesian_2d = cartesian_2d;
var StringSet = require('Set'), Heap = require('heap'), dict = require('dict');
function enforce_config(params) {
    var items = {
        start: 'starting point for the search as `config.start`',
        isEnd: 'function evaluating whether a cell is an end point to boolean as `config.isEnd`',
        neighbor: 'function returning the neighbors of a cell to node array as `config.neighbor`',
        distance: 'function returning the distance between two cells to number as `config.distance`',
        heuristic: 'best-guess no-overestimate distance-to-end to number as `config.heuristic`'
    };
    Object.keys(items).forEach(function (key) {
        if (params[key] === undefined) {
            throw new Error("Must provide a " + items[key]);
        }
    });
    var timeout = (params.timeout === undefined)
        ? 5000 // if it's running for 5 seconds and you didn't explicitly okay that, something is wrong
        : params.timeout;
    if ((!(Number.isInteger(timeout))) || (!(timeout > 0))) {
        throw new Error('Must provide a positive integer or undefined of milliseconds for `config.timeout`');
    }
    var hash = params.hash || defaultHash;
    return {
        timeout: timeout,
        hash: hash
    };
}
function success_result(pathEndpoint) {
    return {
        cost: pathEndpoint.g,
        status: 'success',
        path: reconstructPath(pathEndpoint)
    };
}
function timeout_result(pathEndpoint) {
    return {
        cost: pathEndpoint.g,
        status: 'timeout',
        path: reconstructPath(pathEndpoint)
    };
}
function no_path_result(pathEndpoint) {
    return {
        cost: pathEndpoint.g,
        status: 'no path',
        path: reconstructPath(pathEndpoint)
    };
}
function a_star(params) {
    var _a = enforce_config(params), timeout = _a.timeout, hash = _a.hash;
    var firstHeuristic = params.heuristic(params.start);
    var startNode = {
        data: params.start,
        f: firstHeuristic,
        g: 0,
        h: firstHeuristic,
        // leave .parent undefined
    };
    var bestNode = startNode;
    var closedDataSet = new StringSet(), openHeap = new Heap(heapComparator), openDataMap = dict();
    openHeap.push(startNode);
    openDataMap.set(hash(startNode.data), startNode);
    var startTime = new Date().getTime();
    while (openHeap.size()) {
        if ((new Date().getTime() - startTime) > timeout) {
            return timeout_result(bestNode);
        }
        var node = openHeap.pop();
        openDataMap.delete(hash(node.data));
        // if this, finished
        if (params.isEnd(node.data)) {
            return success_result(node);
        }
        // otherwise, not finished
        closedDataSet.add(hash(node.data));
        var neighbors = params.neighbor(node.data);
        neighbors.forEach(function (neighborData) {
            // skip closed neighbors
            if (closedDataSet.contains(hash(neighborData))) {
                return;
            }
            var gFromThisNode = node.g + params.distance(node.data, neighborData);
            var neighborNode = openDataMap.get(hash(neighborData));
            var update = false;
            if (neighborNode === undefined) {
                neighborNode = { data: neighborData }; // add neighbor to the open set
                openDataMap.set(hash(neighborData), neighborNode); // other properties will be set later
            }
            else {
                if (neighborNode.g < gFromThisNode) {
                    return;
                } // skip this one because another route is faster
                else {
                    update = true;
                }
            }
            // found a new or better route.
            // update this neighbor with this node as its new parent
            neighborNode.parent = node;
            neighborNode.g = gFromThisNode;
            neighborNode.h = params.heuristic(neighborData);
            neighborNode.f = gFromThisNode + neighborNode.h;
            if (neighborNode.h < bestNode.h)
                bestNode = neighborNode;
            if (update) {
                openHeap.heapify();
            }
            else {
                openHeap.push(neighborNode);
            }
        });
    }
    // all the neighbors of every accessible node have been exhausted
    return no_path_result(bestNode);
}
exports.a_star = a_star;
function reconstructPath(node) {
    if (node.parent !== undefined) {
        var pathSoFar = reconstructPath(node.parent);
        pathSoFar.push(node.data);
        return pathSoFar;
    }
    else {
        return [node.data]; // this is the starting node
    }
}
function defaultHash(node) {
    return JSON.stringify(node);
}
function heapComparator(a, b) {
    return a.f - b.f;
}
