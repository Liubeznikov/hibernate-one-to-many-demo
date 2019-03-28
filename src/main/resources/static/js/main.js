
function getIndex(list, id) {
    for (let i = 0; i < list.length; i++ ) {
        if (list[i].id === id) {
            return i;
        }
    }

    return -1;
}


const messageApi = Vue.resource('/message{/id}');

Vue.component('message-form', {
    props: ['messages', 'messageAttr'],
    data: function() {
        return {
            text: '',
            id: ''
        }
    },
    watch: {
        messageAttr: function(newVal, oldVal) {
            this.text = newVal.text;
            this.id = newVal.id;
        }
    },
    template:
    '<div>' +
    '<input type="text" placeholder="Write something" v-model="text" />' +
    '<input type="button" value="Save" @click="save" />' +
    '</div>',
    methods: {
        save: function() {
            var message = { text: this.text };

            if (this.id) {
                messageApi.update({id: this.id}, message).then(result =>
                result.json().then(data => {
                    var index = getIndex(this.messages, data.id);
                this.messages.splice(index, 1, data);
                this.text = ''
                this.id = ''
            })
            )
            } else {
                messageApi.save({}, message).then(result =>
                result.json().then(data => {
                    this.messages.push(data);
                this.text = ''
            })
            )
            }
        }
    }
});

Vue.component('message-row', {
    props: ['message', 'editMethod', 'messages'],
    template: '<div>' +
    '<i>({{ message.id }})</i> {{ message.text }}' +
    '<span style="position: absolute; right: 0">' +
    '<input type="button" value="Edit" @click="edit" />' +
    '<input type="button" value="X" @click="del" />' +
    '</span>' +
    '</div>',
    methods: {
        edit: function() {
            this.editMethod(this.message);
        },
        del: function() {
            messageApi.remove({id: this.message.id}).then(result => {
                if (result.ok) {
                this.messages.splice(this.messages.indexOf(this.message), 1)
            }
        })
        }
    }
});

Vue.component('messages-list', {
    props: ['messages'],
    data: function() {
        return {
            message: null
        }
    },
    template:
    '<div style="position: relative; width: 300px;">' +
    '<message-form :messages="messages" :messageAttr="message" />' +
    '<message-row v-for="message in messages" :key="message.id" :message="message" ' +
    ':editMethod="editMethod" :messages="messages" />' +
    '</div>',
    created: function() {
        messageApi.get().then(result =>
        result.json().then(data =>
        data.forEach(message => this.messages.push(message))
    )
    )
    },
    methods: {
        editMethod: function(message) {
            this.message = message;
        }
    }
});


Vue.component('buttons', {
    props: {'buttname' : String},
    data: function() {
        return {
            tex: ''
        };
    },

    template:
    '<div>' +
    '<div >' +
    //'<input type="text" placeholder="Write some" v-model="tex" />' +
    '<button class="gameButton" type="button"  @click="button1Click" >' +
    '{{this.buttname}}' +
    '</button>' +
    '</div>'+
    '</div>',

    methods: {
        button1Click: function () {
            alert(this.buttname);
            this.tex = '';
        }
    }

});

Vue.component('rowButtons', {

    data: function() {
        return{
            i: 0
        }
    },
    template:
    '<div>' +
    '<div v-for="k in 8">' +
    '<span v-for="n in 3">' +
    '{{ n }} ' +
    '{{ k }} ' +
    '<buttons />'+
    '<buttons />'+
    '</span>'+
    '</div>'+
    '</div>',


});

Vue.component('tableEx', {

    data: function() {
        return{
            e: 'exxx'
        }
    },
    template:
    '<div>'+
    '<table align="left" >'+
    '<tr v-for="n in 8">'+
    '<td v-for="k in 4">'+
    '<buttons :buttname = "setE(n,k)"/>'+
    '</td>' +
    '</tr>' +
    '</table>'+
    '</div>',
    methods:{
        setE: function(n,k){
            e = (3*(n-1) + k).toString();
            return e;
        }
    }
});

Vue.component()

Vue.component('tablePerformance', {
    data: function() {
        return{
            timer1:0,
            timer2:0,
            tex: ''
        }
    },

    template:
    '<div>'+
    '<input type="text" placeholder="Write some" v-model="tex" />' +
    '<table align="left" >'+
    '<tr >'+
    '<td>'+
    '<button class="performanceButton" @click = "start" > Start  </button>'+
    '</td>' +
    '<td>'+
    '<button class="performanceButton" @click = "finish"> Finish  </button>'+
    '</td>' +
    '</tr>' +
    '</table>' +
    '</div>',
    methods:{
        start: function(){
            this.timer1 = performance.now();
        },
        finish: function(){
            this.timer2 = performance.now();
            this.tex = (this.timer2 - this.timer1).toString();

        }
    }
});





const app = new Vue({
    el: '#app',
    template:
    '<div>' +
    '<messages-list :messages="messages" />' +
     '<table-ex />' +
    '<table-performance />' +
    '</div>',
    data: {
        messages: []
    }
});
