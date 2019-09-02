// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
//import Vue from 'vue/dist/vue';
const Vue = require('vue/dist/vue');
const { clipboard } = require('electron')
const App = new Vue({
    el: '#app',
    data:{
        title: 'Copy History',
        history: []
    },
    
    mounted(){
        this.history.push({
            text: clipboard.readText(),
            clipped: new Date().toDateString()
        });
        setInterval(this.checkClipboard,500);

    },
    computed: {
        historyReversed(){
            return this.history.slice().reverse();
        }
    },
    methods:{
        checkClipboard(){
            const text = clipboard.readText();
            if (this.history[this.history.length-1].text !== text){
                this.history.push({
                    text,
                    clipped: new Date().toDateString()
                });
            }
        },
        itemClicked(item){
            clipboard.writeText(item.text);
        }
    }
});
