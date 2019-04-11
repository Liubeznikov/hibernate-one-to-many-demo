
Vue.component('searchForm', {

    data: function() {
        return{
            login: ''

        }
    },
    template:
    '<div>'+
    '<h3> Search Form</h3>' +
    '<p>Login </p>'  +
    '<input  type="text" placeholder="info" v-model="login" />' +

    '<br> </br>' +
    '<button @click ="searchButton"> Login </button>'+

    '</div>',
    methods: {

        searchButton: function(){
           alert("search");

        }
    }
});


Vue.component('userTable', {

    data: function() {
        return{
            login: ['a', 'b','c'],
            name: ['a', 'b','c']

        }
    },
    template:
    '<div>'+
    '<h3> User Table</h3>' +
    '<table align="left" >'+
    '<tr >'+
    '<td >'+
    '<p> Login </p>'+
    '</td>' +
    '<td >'+
    '<p> Name </p>'+
    '</td>' +
    '</tr>' +
    '<tr v-for="n in 3">'+
    '<td >'+
    '<p @click="clickProcessor(login[n-1])"> {{login[n-1]}}</p>'+
    '</td>' +
    '<td >'+
    '<p @click="clickProcessor(name[n-1])"> {{name[n-1]}}</p>'+
    '</td>' +
    '</tr>' +
    '</table>'+

    '</div>',
    methods: {

        clickProcessor: function(str){
            alert(str);

        }
    }
});






const appUserList = new Vue({
    el: '#appUserList',
    template:
    '<div>' +
    '<searchForm/>' +
    '<userTable/>' +
    '</div>',
    data: {
        messages: []
    }
});

