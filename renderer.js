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
        setInterval(this.checkClipboard,500);

    },
    methods:{
        checkClipboard(){
            const text = clipboard.readText();
            if (this.history[this.history.length-1] != text){
                this.history.push(text);
            }
        }
    }
});