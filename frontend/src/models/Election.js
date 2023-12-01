class Election {
    /**
     * @param {number} timestamp
     * @param {Array<string>} candidates
     * @param {Object<string, number>} candidateVotes
     * @param {boolean} hasEnded
     */
    constructor(timestamp, candidates, candidateVotes, hasEnded) {
        this.timestamp = timestamp;
        this.candidates = candidates;
        this.candidateVotes = candidateVotes;
        this.hasEnded = hasEnded;
    }
}

export default Election;