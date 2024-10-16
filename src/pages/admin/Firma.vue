<template>
  <q-layout>
    <q-header>
      <q-toolbar>
        <q-toolbar-title>
          Admin Paneli
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="q-pa-md bg-gradient flex flex-center">
        <div class="card-container q-pa-lg shadow-2 q-border-radius-md">
          <q-avatar size="120px" class="q-mb-md" rounded>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" alt="Logo">
          </q-avatar>
          <div class="q-mb-md">
            <h2 class="text-h5 text-bold text-primary">Firma Bilgileri</h2>
            <p class="text-subtitle2">Lütfen firma bilgilerinizi giriniz.</p>
          </div>
          <q-input v-model="name" label="Ad" filled dense class="q-mb-md input-styled" />
          <q-input v-model="description" label="Açıklama" filled dense type="textarea" class="input-styled" />
          <q-btn color="primary" label="Kaydet" class="q-mt-md full-width" />
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
const name = ref('')
const description = ref('')
</script>

<style scoped>
.bg-gradient {
  background: linear-gradient(135deg, #ece9e6 0%, #ffffff 100%);
  min-height: 100vh;
}
.card-container {
  max-width: 600px;
  width: 100%;
  background-color: white;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
}
.input-styled {
  border-radius: 8px;
}
.full-width {
  width: 100%;
}
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
