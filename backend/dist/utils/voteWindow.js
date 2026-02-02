"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isWithinVotingHours = void 0;
const isWithinVotingHours = () => {
    const now = new Date();
    const hour = now.getHours();
    return hour >= 9 && hour < 18;
};
exports.isWithinVotingHours = isWithinVotingHours;
// this will help to fix the timeer between 9 to 6 and we can only vote at this time
