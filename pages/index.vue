<script setup lang="ts">
const {data, pending} = await useFetch('/api/timeline')
const videoData = await useFetch('/api/videodata').data
let jsonData = JSON.stringify(videoData);
// console.log(videoData)
// console.log(jsonData)
// let parsedData = JSON.parse(jsonData);
function convertIsoToTime(isoDuration: string): string {
    const match = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

    const hoursStr = (match[1] !== undefined) ? match[1].slice(0, -1) : '00';
    const minutesStr = (match[2] !== undefined) ? match[2].slice(0, -1) : '00';
    const secondsStr = (match[3] !== undefined) ? match[3].slice(0, -1) : '00';

    return `${hoursStr}:${minutesStr}:${secondsStr}`;
}
</script>
<template>
    <head>
        <title>SSSniperwolf Incident Timeline</title>
    </head>
    <div class="sharp">
        <div v-if="pending">
            <h1>Loading...</h1>
        </div>
        <div v-else>
            <ul class="timeline">
                <h1>SSSniperwolf Incident Timeline</h1>
            <!-- Timeline fetched from API -->
                <li v-for="item in data['timelineData']" class="timeline-item">
                    <h1>{{ new Date(Number(item.timestamp) * 1000).toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true, hourCycle: 'h23'}) }}</h1>
                    <a :href="item.links[0]['url']" style="        text-decoration: none;color: blue;">{{item.links[0]["title"] }}</a>
                    <p>{{ item.values["header"] }}</p>
                </li>
            </ul>
            
            <!-- Gets json data of video changes & removals -->
            <ul class="video_modifications">
                <h1>Video Modifications</h1>
                <li v-for="video in videoData?.jsondata">
                    <li v-if="video.type === 'removed'">
                        {{ video.type }}: {{ video.old_video?.snippet.title }}
                        <p>Published on {{ new Date(video.old_video?.snippet.publishedAt).toLocaleString([], {month: 'numeric', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true}) }}</p>
                        <p>Duration: {{ convertIsoToTime(video.old_video?.contentDetails.duration) }}</p>
                        <p>Stats: {{ video.old_video?.statistics?.viewCount }} views, {{ video.old_video?.statistics?.likeCount }} likes, and {{ video.old_video?.statistics?.commentCount }} comments</p>
                    </li>
                    <li v-else>
                        {{ video.type }}: {{ video.video?.snippet.title }}
                        <p>Published on {{ new Date(video.video?.snippet.publishedAt).toLocaleString([], {month: 'numeric', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true}) }}</p>
                        <p>Video: <a :href="'https://youtube.com/watch?v=' + video.video?.id" style="text-decoration: none; color: rgb(53, 158, 238);" class="hov_a">Link</a></p>
                        <p>New Duration: {{ convertIsoToTime(video.video.contentDetails.duration) }}</p>
                        <p>Stats at the time of capture: {{ video.video?.statistics?.viewCount }} views, {{ video.video?.statistics?.likeCount }} likes, and {{ video.video?.statistics?.commentCount }} comments</p>
                    </li>
                </li>
            </ul>
            </div> 
    </div>
</template>
<style scoped>
    .hov_a:hover {
        color: rgb(19, 152, 254);
        transition: 0.5s;
    }
    .video_modifications {
        width: fit-content;
        background-color: #343434;
        border-radius: 10px;
        height: 50vh;
        overflow: auto;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

    }
    .timeline {
        list-style: none;
        padding: 0;
        margin: 0;
        border-radius: 10px;
        background-color: rgb(30, 30, 30);
        text-align: center;
        align-content: center;
        color: white;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    .timeline-item {
        padding: 20px;
        background-color: #292929;
        width: fit-content;
        border-radius: 10px;
        margin: 0 auto;
        margin-bottom: 10px;
        color: white;
        gap: 10px;
    }
    .sharp {
        height: fit-content;
        background-color: rgb(17, 17, 17);
        padding: 50px;
        border-radius: 10px;
        color: white;
    }
</style>