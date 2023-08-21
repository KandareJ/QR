import React from "react";

import {useScanner} from "./scan";

const ScanTest = () => {
    const [text, setText] = React.useState("<empty>");
    useScanner(setText);

    return (
        <div>
            Scanned Data: {text}
        </div>
    );
};

export default ScanTest;