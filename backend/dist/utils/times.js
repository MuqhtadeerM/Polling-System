"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRemainingTime = void 0;
const getRemainingTime = (startedAt, duration) => {
    const elapsed = Math.floor((Date.now() - new Date(startedAt).getTime()) / 1000);
    return Math.max(duration - elapsed, 0);
};
exports.getRemainingTime = getRemainingTime;
