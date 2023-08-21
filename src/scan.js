import React from "react";

class ScanListener {
    constructor(onScan) {
        this.data = "";
        this.maxKeyDelayInMilliseconds = 5;
        this.onScan = onScan;
    }

    attachListener = () => {
        document.addEventListener("keypress", this.handleKeyPress);
    }

    handleKeyPress = (event) => {
        if (event.key) this.data += event.key;
        if (this.timeoutEventId) {
            clearTimeout(this.timeoutEventId);
        }
        this.timeoutEventId = setTimeout(this.handleScan, this.maxKeyDelayInMilliseconds);
    }

    handleScan = () => {
        if (this.data.length > 6) {
            this.onScan(this.data);
        }

        this.data = "";
    }

    detachListener = () => {
        document.removeEventListener("keypress", this.handleKeyPress);
    }
};

export const useScanner = (onScan) => {
    React.useEffect(() => {
        const scanListener = new ScanListener(onScan);
        scanListener.attachListener(document);

        return () => {
            scanListener.detachListener(document);
        }
    }, [onScan]);
};