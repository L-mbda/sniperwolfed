<script setup lang="ts">
const {data, pending} = await useFetch('/api/timeline')

</script>
<template>
    <head>
        <title>SSSniperwolf Incident Timeline</title>
    </head>
    <div v-if="pending">
        <h1>Loading...</h1>
    </div>
    <div v-else>
        <h1>SSSniperwolf Incident Timeline</h1>
        <ul class="timeline">
            <li v-for="item in data['timelineData']" class="timeline-item">
                <h1>{{ new Date(Number(item.timestamp) * 1000).toLocaleString() }}</h1>

                <a :href="item.links[0]['url']" style="        text-decoration: none;color: blue;">{{item.links[0]["title"] }}</a>
                <p>{{ item.values["header"] }}</p>
            <!--  <li v-for="item in timelineData.data.value['timelineData']">
                <h1>{{ new Date(item.timestamp * 1000).toLocaleString() }}</h1>

                <a :href="item.links[0]['url']">{{item.links[0]["title"] }}</a>
                <p>{{ item.values["header"] }}</p> -->
            </li>
        </ul>
    </div> 
</template>
<style scoped>
    .timeline {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    .timeline-item {
        padding: 20px;
        border-bottom: 1px solid #ccc;
        background-color: #292929;
        width: fit-content;
        border-radius: 10px;
        color: white;
    }
</style>