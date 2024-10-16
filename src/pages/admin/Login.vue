<template>
    <q-layout class="bg-gradient">
      <q-header elevated>
        <q-toolbar>
          <q-toolbar-title>
            Uygulama Başlığı
          </q-toolbar-title>
        </q-toolbar>
      </q-header>
  
      <q-page-container>
        <q-page class="flex flex-center">
          <div class="login-container q-pa-lg">
            <h2 class="text-h5 text-bold text-primary">Admin Girişi</h2>
            <q-input
              v-model="username"
              label="Kullanıcı Adı"
              filled
              dense
              class="q-mb-md input-styled"
              required
            />
            <q-input
              v-model="password"
              label="Şifre"
              type="password"
              filled
              dense
              class="q-mb-md input-styled"
              required
            />
            <q-btn
              label="Giriş Yap"
              color="primary"
              class="full-width q-mt-md"
              @click="handleLogin"
            />
            <p class="text-center q-mt-md">
              <q-checkbox v-model="rememberMe" label="Beni Hatırla" />
            </p>
          </div>
        </q-page>
      </q-page-container>
    </q-layout>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const username = ref('');
  const password = ref('');
  const rememberMe = ref(false);
  
  const handleLogin = () => {
    // Giriş işlemleri burada yapılacak
    console.log('Giriş yapılıyor...');
    console.log('Kullanıcı Adı:', username.value);
    console.log('Şifre:', password.value);
    console.log('Beni Hatırla:', rememberMe.value);
  };
  </script>
  
  <style scoped>
  .bg-gradient {
    background: linear-gradient(135deg, #ece9e6 0%, #ffffff 100%);
    min-height: 100vh;
  }
  
  .login-container {
    max-width: 400px;
    width: 100%;
    background-color: white;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .input-styled {
    border-radius: 8px;
  }
  
  .full-width {
    width: 100%;
  }
  </style>
  