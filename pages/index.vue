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
        <title>sAlia Dashboard</title>
    </head>
    <div class="sharp">
        <div v-if="pending">
            <h1>Loading...</h1>
        </div>
        <div v-else>
            <ul class="timeline">
                <h1>sAlia Incident Timeline (based on available information)</h1>
            <!-- Timeline fetched from API -->
                <li v-for="timelineItem in data?.timelineData" class="timeline-item">
                    <h1>{{ new Date(Number(timelineItem.timestamp) * 1000).toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true, hourCycle: 'h23'}) }}</h1>
                    <a :href="timelineItem.links[0]['url']" style="        text-decoration: none;color: rgb(81, 255, 136);">{{timelineItem.links[0]["title"] }}</a>
                    <p>{{ timelineItem.values["header"] }}</p>
                </li>
            </ul>
            <div class="side-by-side">
                <div>
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
                <br>
                <div class="help">
                    <h1>We need your help!</h1>
                    <a href="https://docs.google.com/document/d/1_BUpaSN8ZU44LrnVsELcBVlD9c3e6TH-17LKmWw2P30/edit" style="text-decoration: none; color: rgb(1, 221, 255);">Google Doc Link</a>
                    <p>Spread this document to anyone you know who is aware of the SSSniperwolf situation. The document contains serious incriminating evidence against Alia that was posted on her own channel.</p>
                </div>
            </div>
            <br>
            <footer style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                <p>Created by <a href="https://github.com/de-y" style="text-decoration: none; color: rgb(59, 255, 115);">de-y</a> with help of the TTTakedown Tracker community.</p>
                <a href="https://github.com/de-y/sniperwolfed" style="text-decoration: none; color: rgb(0, 191, 255);">GitHub</a>
            </footer>
        </div>
    </div>
</template>
<style scoped>
    .help {
        background-color: #343434;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        color: white;
        width: 50%;
        padding: 10px;
        border-radius: 10px;
        height: 48vh;
        transform: translateY(4%);
        align-self: right;
        text-align: center;
        overflow: auto;
    }
    .help h1 {
        font-size: 3rem;
    }
    .help a {
        font-size: 2rem;
    }
    .help p {
        font-size: 1rem;
    }
    .side-by-side {
        display: flex;
        flex-direction: row;
        column-gap: 50px;
    }
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
        overflow: auto;
        height: 40vh;
    }
    .timeline-item {
        padding: 20px;
        background-color: #292929;
        width: 65%;
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
    @media only screen and (max-width: 600px) {
        .timeline-item {
            width: 100%;
        }
        .side-by-side {
            flex-direction: column;
        }
        .help {
            width: fit-content;
            transform: translateY(0%);
        }
        .help h1 {
            font-size: 2rem;
        }
        .help a {
            font-size: 1.5rem;
        }
        .help p {
            font-size: 1rem;
        }
    }
</style>