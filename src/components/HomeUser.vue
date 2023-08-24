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
          <!-- Adicione aqui o conteúdo para selecionar o evento -->
        </div>
      </div>
    </div>
  </template>
  
  <script>
  //import axios from 'axios';
  
  export default {
    data() {
      return {
        selectedOption: 'none',
        user: {
          name: 'Nome do Usuário' // Substitua com os dados do usuário logado
        },
      };
    },
    methods: {
      selectOption(option) {
        this.selectedOption = option;
      },
      logout() {
        // Adicione aqui a lógica para fazer logout
        this.$router.push('/menu');
      }
    },
  };
  </script>
  
  <style>
  /* Você pode usar o mesmo estilo que antes ou fazer as modificações necessárias para ajustar o layout */
  .welcome-message {
    font-size: 24px;
    margin-bottom: 20px;
    color: white;
    font-weight: bold;
  }
  </style>
  