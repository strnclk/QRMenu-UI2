<template>
  <q-layout>
    <q-header>
      <q-toolbar>
        <q-toolbar-title>
          Yemek Yönetim Paneli
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="q-pa-md">
        <q-btn color="primary" label="Yemek Ekle" @click="showAddDialog" class="q-mb-md" />

        <q-table
          :rows="meals"
          :columns="columns"
          row-key="id"
          @request="handleRequest"
        >
          <template v-slot:body-cell-actions="props">
            <q-td>
              <q-btn icon="edit" @click="editMeal(props.row)" color="orange" />
              <q-btn icon="delete" @click="deleteMeal(props.row.id)" color="negative" />
            </q-td>
          </template>
        </q-table>

        <!-- Add/Edit Dialog -->
        <q-dialog v-model="dialog" persistent>
          <q-card>
            <q-card-section>
              <div class="text-h6">{{ isEdit ? 'Yemeği Güncelle' : 'Yemek Ekle' }}</div>
              <q-input v-model="currentMeal.name" label="Yemek Adı" required />
              <q-input v-model="currentMeal.price" label="Fiyat" type="number" required />
              <q-input v-model="currentMeal.image" label="Resim URL'si" required />
            </q-card-section>

            <q-card-actions>
              <q-btn flat label="İptal" @click="closeDialog" />
              <q-btn flat color="primary" label="Kaydet" @click="saveMeal" />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'

const meals = ref([])
const pagination = ref({ page: 1, rowsPerPage: 5 })
const dialog = ref(false)
const isEdit = ref(false)
const currentMeal = ref({ id: null, name: '', price: '', image: '' })

const columns = [
  { name: 'name', label: 'Yemek Adı', align: 'left', field: 'name' },
  { name: 'price', label: 'Fiyat', align: 'left', field: 'price' },
  { name: 'image', label: 'Resim', align: 'left', field: 'image', format: (val) => `<img src="${val}" alt="${val}" width="50" />`, html: true },
  { name: 'actions', label: 'İşlemler', align: 'center', field: 'actions' },
]

const showAddDialog = () => {
  isEdit.value = false
  currentMeal.value = { id: null, name: '', price: '', image: '' }
  dialog.value = true
}

const editMeal = (meal) => {
  isEdit.value = true
  currentMeal.value = { ...meal }
  dialog.value = true
}

const closeDialog = () => {
  dialog.value = false
}

const saveMeal = () => {
  if (isEdit.value) {
    // Güncelleme işlemi
    const index = meals.value.findIndex(m => m.id === currentMeal.value.id)
    if (index !== -1) {
      meals.value[index] = { ...currentMeal.value }
    }
  } else {
    // Ekleme işlemi
    currentMeal.value.id = Date.now() // Basit bir id oluşturma yöntemi
    meals.value.push({ ...currentMeal.value })
  }
  closeDialog()
}

const deleteMeal = (id) => {
  meals.value = meals.value.filter(meal => meal.id !== id)
}

// Örnek veriler
meals.value = [
  { id: 1, name: 'Pizza', price: '50', image: 'https://example.com/pizza.jpg' },
  { id: 2, name: 'Hamburger', price: '30', image: 'https://example.com/hamburger.jpg' },
]
</script>

<style scoped>
/* Stil ayarlamaları */
</style>
