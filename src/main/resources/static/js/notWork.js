Vue.component('registerForm', {

    data: function() {
        return{
            login: '',
            name: '',
            repeatPassword: '',
            password: ''
        }
    },
    template:
    '<div>'+
    '<p>Loginn</p>'  +
    '<input  type="text" placeholder="info" v-model="login" />' +
    '<p>Name</p>'  +
    '<input  type="text" placeholder="info" v-model="name" />' +
    '<p>Password</p>'  +
    '<input  type="text" placeholder="info" v-model="password" />' +
    '<p>Repeat Password</p>'  +
    '<input  type="text" placeholder="info" v-model="repeat-password" />' +
    '<br> </br>' +
    '<button @click ="registerButton"> Register </button>'+
    '<button @click ="cancelButton"> Cancel </button>'+

    '</div>',
    methods:{
        registerButton: function(){
            alert("Login =" + this.login + "Password =" + this.password + "Name =" + this.name + "Repeat password =" + this.repeatPassword)
        },
        cancelButton: function(){
            window.location.href='loginPage.html';

        }
    }
});
