import React from 'react';
import {createRoot} from "react-dom/client";
import App from "./App";

let rootElement = document.getElementById('root')
if (rootElement) {
    let root = createRoot(rootElement)

    root.render (
        <App/>
    )
}
