export type tickerUpdateMessage = {
    type: "ticker";
    data: {
        c?: string;
        h?: string;
        l?: string;
        v?: string;
        V?: string;
        s?: string;
        id: number;
        e: "ticker";
    };
};
export type depthUpdateMessage = {
    type: "depth";
    data: {
        b?: [string, string][];
        a?: [string, string][];
        id: number;
        e: "depth";
    };
};
export type OutgoingMessage = tickerUpdateMessage | depthUpdateMessage;
//# sourceMappingURL=outgoingMessages.d.ts.map