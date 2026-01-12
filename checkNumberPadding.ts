export function checkNumberPadding(nums: Iterable<string>): number {
    let observedPad: number | null = null;
    let hasUnpadded = false;
    let smallestLen = Infinity;
    let seen = false;

    const countZeros = (s: string): number => {
        let i = 0;
        while (i < s.length && s[i] === '0') i++;
        return i;
    };

    for (const num of nums) {
        seen = true;
        const numOfzero = countZeros(num);
        const len = num.length;

        if (numOfzero === 0) {
            hasUnpadded = true;
            smallestLen = Math.min(smallestLen, len);
        } else {
            const padLen = len;
            if (observedPad === null) {
                observedPad = padLen;
            } else if (observedPad !== padLen) {
                return -1;
            }
        }
    }

    if (!seen) return 0;

    if (observedPad !== null) {
        if (hasUnpadded && smallestLen > observedPad) return -1;
        return observedPad;
    }

    if (hasUnpadded) {
        if (smallestLen === 1) return 1;
        return -smallestLen;
    }

    return 0;
}
