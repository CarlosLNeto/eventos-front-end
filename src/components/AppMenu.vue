<template>
  <div class="container">
    <div class="sidebar">
      <button @click="selectOption('registerUser')" class="sidebar-button">Cadastrar Usuário</button>
      <button @click="selectOption('loginUser')" class="sidebar-button">Login como Usário</button>
      <button @click="selectOption('registerGerente')" class="sidebar-button">Cadastrar Gerente de Eventos</button>
      <button @click="selectOption('loginGerente')" class="sidebar-button">Login como Gerente</button>
    </div>
    <div class="content">
      <div v-if="selectedOption === 'registerUser'" class="form">
        <h2>Cadastrar Usuário</h2>
        <label>Nome:</label>
        <input type="text" placeholder="Nome" v-model="name" />
        <label>Celular:</label>
        <input type="text" placeholder="Celular" v-model="celular"/>
        <label>Email:</label>
        <input type="text" placeholder="Email" v-model="email"/>
        <label>Login:</label>
        <input type="text" placeholder="Login" v-model="login"/>
        <label>Senha:</label>
        <input type="password" placeholder="Senha" v-model="password"/>
        <button class="form-button" @click="cadastrarUsuario">Cadastrar</button>
      </div>
      <div v-if="selectedOption === 'registerGerente'" class="form">
        <h2>Cadastrar Gerente</h2>
        <label>Nome:</label>
        <input type="text" placeholder="Nome" v-model="name" />
        <label>Celular:</label>
        <input type="text" placeholder="Celular" v-model="celular"/>
        <label>Email:</label>
        <input type="text" placeholder="Email" v-model="email"/>
        <label>Login:</label>
        <input type="text" placeholder="Login" v-model="login"/>
        <label>Senha:</label>
        <input type="password" placeholder="Senha" v-model="password"/>
        <button class="form-button" @click="cadastrarGerente">Cadastrar</button>
      </div>
      <div v-if="selectedOption === 'loginUser'" class="form">
        <h2>Login como Usuário</h2>
        <label>Login:</label>
        <input type="text" placeholder="Login" v-model="login"/>
        <label>Senha:</label>
        <input type="password" placeholder="Senha" v-model="password"/>
        <button class="form-button" @click="loginUser">Realizar Login</button>
      </div>
      <div v-if="selectedOption === 'loginGerente'" class="form">
        <h2>Login como Gerente</h2>
        <label>Login:</label>
        <input type="text" placeholder="Login" v-model="login"/>
        <label>Senha:</label>
        <input type="password" placeholder="Senha" v-model="password"/>
        <button class="form-button" @click="loginGerente">Realizar Login</button>
      </div>
    </div>
    <div v-if="showPopup" class="popup">
      {{ popupMessage }}
      <button @click="showPopup = false">Fechar</button>
    </div>

  </div>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      selectedOption: 'none',
      userType: 'none',
      popupMessage: '',
      showPopup: false,
      name: '',
      celular: '',
      email: '',
      login: '',
      password: ''
    };
  },
  methods: {
    selectOption(option) {
      this.selectedOption = option;
    },
    
    async cadastrarUsuario() {
      try {
        await axios.post('http://localhost:8080/user', {
          name: this.name,
          celular: this.celular,
          email: this.email,
          login: this.login,
          password: this.password
        });
        this.popupMessage = 'Usuário cadastrado com sucesso';
        this.showPopup = true;

        this.name = '';
        this.celular = '';
        this.email = '';
        this.login = '';
        this.password = '';
      } catch (error) {
        this.popupMessage = 'Erro ao cadastrar o usuário: ' + error.message;
        this.showPopup = true;
      }
    },

    async cadastrarGerente() {
      try {
        await axios.post('http://localhost:8080/gerente', {
          name: this.name,
          celular: this.celular,
          email: this.email,
          login: this.login,
          password: this.password
        });
        this.popupMessage = 'Usuário cadastrado com sucesso';
        this.showPopup = true;

        this.name = '';
        this.celular = '';
        this.email = '';
        this.login = '';
        this.password = '';
      } catch (error) {
        this.popupMessage = 'Erro ao cadastrar o usuário: ' + error.message;
        this.showPopup = true;
      }
    },

    async loginUser() {
      try {
        const response = await axios.post('http://localhost:8080/user/login', {
          login: this.login,
          password: this.password,
        });
        this.user = response.data.user;
        this.popupMessage = 'Login efetuado!';
        this.showPopup = true;
        localStorage.setItem('user', JSON.stringify({ name: response.data.name, email: response.data.email, id: response.data.id }))
        this.$router.push('/user');
      } catch (error) {
        this.popupMessage = 'Erro ao logar: ' + error.message;
        this.showPopup = true;
      }
    },
  /* async loginGerente() {
    
  }, */

  },
};
</script>

<style>
.popup {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 30px; 
  width: 50%; 
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  font-size: 30px; 
  text-align: center;
}

.popup button {
  padding: 20px;
  font-size: 24px;
  cursor: pointer;
  background-color: #FF69B4;
  color: white;
  border: none;
  width: 100%;
  transition: background-color 0.3s;
  font-weight: bold;
}

.popup button:hover {
  background-color: #FF1493; 
}

.container {
  width: 100%;
  height: 100vh;
  display: flex;
  background-color: white;
}

.sidebar {
  flex: 1;
  background-color: #FF69B4;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.sidebar-button {
  width: 80%;
  padding: 15px;
  margin-bottom: 10px;
  font-size: 18px;
  cursor: pointer;
  background-color: white;
  border: 1px solid #ccc;
  transition: background-color 0.3s;
  text-align: center;
  font-family: 'Arial', sans-serif; 
  font-weight: bold;
}


.sidebar-button:hover {
  background-color: #f0f0f0;
}

.content {
  flex: 3;
  padding: 20px;
}

.form h2 {
  font-size: 52px;
  margin-bottom: 20px;
  color: #FF69B4; 
  font-weight: bold; 
}

label {
  font-size: 18px;
  display: block;
  margin: 10px 0;
  font-family: 'Arial', sans-serif;
}

input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  font-family: 'Arial', sans-serif; 
}

.form-button {
  padding: 15px;
  font-size: 26px;
  cursor: pointer;
  background-color: #FF69B4;
  color: white;
  border: none;
  width: 100%;
  font-family: 'Arial', sans-serif; 
  transition: background-color 0.3s;
  font-weight: bold;
}

.form-button:hover {
  background-color: #FF1493;
}

</style>
