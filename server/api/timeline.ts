import json from '~/public/timeline.json'
export default eventHandler((event) => {
    return {
        timelineData: json
    }       
})