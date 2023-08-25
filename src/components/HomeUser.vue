<template>
  <div class="container">
    <div class="sidebar">
      <div class="welcome-message">Bem vindo, {{ user.name }}</div>
      <button @click="selectOption('selectEvent')" class="sidebar-button">Selecionar Evento</button>
      <button @click="logout" class="sidebar-button">Sair</button>
    </div>
    <div class="content">
      <div v-if="selectedOption === 'selectEvent'" class="form">
        <h2>Selecionar Evento</h2>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Nome</th>
              <th>Data</th>
              <th>Local</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="event in events" :key="event.id">
              <td><input type="radio" :value="event.id" v-model="selectedEvent"></td>
              <td>{{ event.name }}</td>
              <td>{{ formatDate(event.date) }}</td>
              <td>{{ event.local }}</td>
            </tr>
          </tbody>
        </table>
        <button @click="selectEvent" class="form-button">Selecionar</button>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      selectedOption: 'none',
      user: {
        name: ''
      },
      events: [],
      selectedEvent: null,
    };
  },
  mounted() {
    this.getUserInfo();
    this.getEvents();
  },
  methods: {
    formatDate(timestamp) {
      const date = new Date(timestamp);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Os meses começam do 0
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },
    getUserInfo() {
      const userInfo = JSON.parse(localStorage.getItem('user'));
      if (userInfo) {
        this.user.name = userInfo.name;
      }
    },
    getEvents() {
      axios.get('http://localhost:8080/evento')
        .then(response => {
          this.events = response.data;
        })
        .catch(error => {
          console.error('Erro ao buscar eventos:', error);
        });
    },
    selectOption(option) {
      this.selectedOption = option;
    },
    selectEvent() {
      console.log('Evento selecionado:', this.selectedEvent);
      // Aqui você pode lidar com o evento selecionado
    },
    logout() {
      this.$router.push('/');
    },
  },
};
</script>

<style>
.container {
  display: flex;
  font-family: Arial, sans-serif;
}

.content {
  flex-grow: 1;
  padding: 20px;
}

.form {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
}

.form button {
  margin-top: 20px;
}


table {
  width: 100%;
  border-collapse: collapse;
  font-size: 1.3em;
}

th, td {
  padding: 15px;
  border: 1px solid #ddd;
  text-align: left;
}

th {
  background-color: #f5f5f5;
  font-size: 1.5em;
}

tr:nth-child(even) {
  background-color: #f5f5f5;
}

input[type="radio"] {
  transform: scale(2);
  align-items: center;
}

</style>




