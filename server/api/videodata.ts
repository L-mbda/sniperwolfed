import json from "~/public/changes.json";
export default eventHandler((event) => {
    return {
        jsondata: json,
    }
});