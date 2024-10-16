<template>
  <q-page padding>
    <HeaderPage
      title="Menü"
      subTitle="Menüdeki Ürünleri Buradan Düzenleyebilirsiniz"
    />
    <div class="row q-mt-md card-header-table q-col-gutter-y-sm justify-between shadow-card q-mb-md">
      <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12">
        <q-input
          label="Ara"
          v-model="filter"
          outlined
          dense
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
        <div class="row justify-end q-gutter-sm">
          <q-btn
            label="Ekle"
            class="float-right col"
            color="primary"
            unelevated
            no-caps
            no-wrap
            icon="add_circle"
            @click="openAddDialog"
          />
        </div>
      </div>
    </div>

    <q-card class="shadow-card">
      <q-card-section>
        <q-table
          flat
          :rows="rows"
          :columns="DefaultColumns"
          row-key="name"
          :filter="filter"
          :loading="loading"
          separator="none"
          v-model:pagination="pagination"
          @request="onRequest"
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="profilePicture" :props="props">
                <div class="row q-gutter-sm no-wrap">
                  <q-avatar>
                    <q-img
                      :src="props.row.profile_picture"
                      width="4em"
                    />
                  </q-avatar>
                </div>
              </q-td>
              <q-td key="eat_name" :props="props">
                {{ props.row.eat_name }}
              </q-td>
              <q-td key="price" :props="props">
                {{ props.row.price }}
              </q-td>
              <q-td key="description" :props="props">
                {{ props.row.description }}
              </q-td>
              <q-td key="actions" :props="props">
                <div class="justify-center q-gutter-x-xs">
                  <q-btn-dropdown
                      no-caps
                      color="primary"
                      unelevated
                    >
                      <template v-slot:label>
                        <q-icon name="edit" />
                      </template>
                    <q-list>
                      <q-item clickable @click="openUpdateDialog(props.row)" v-close-popup>
                        <q-item-section>
                          <q-item-label>Güncelle</q-item-label>
                        </q-item-section>
                      </q-item>
                      <q-item clickable @click="openDeleteDialog(props.row)" v-close-popup>
                        <q-item-section>
                          <q-item-label>Sil</q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-btn-dropdown>
                </div>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </q-card-section>
    </q-card>

    <!-- Yeni Yemek Ekle Modal -->
    <q-dialog v-model="addDialogVisible" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">Yeni Yemek Ekle</div>
        </q-card-section>

        <q-card-section>
          <q-input v-model="newFood.image" label="Yemek Resmi (URL)" filled />
          <q-input v-model="newFood.name" label="Yemek Adı" filled class="q-mt-md" />
          <q-input v-model="newFood.description" label="Yemek Açıklaması" filled type="textarea" class="q-mt-md" />
          <q-input v-model="newFood.price" label="Fiyat" type="number" filled class="q-mt-md" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="İptal" color="negative" @click="closeAddDialog" />
          <q-btn flat label="Ekle" color="primary" @click="addFood" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Güncelle Modal -->
    <q-dialog v-model="updateDialogVisible" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">Yemeği Güncelle</div>
        </q-card-section>

        <q-card-section>
          <q-input v-model="updateFood.image" label="Yemek Resmi (URL)" filled />
          <q-input v-model="updateFood.name" label="Yemek Adı" filled class="q-mt-md" />
          <q-input v-model="updateFood.description" label="Yemek Açıklaması" filled type="textarea" class="q-mt-md" />
          <q-input v-model="updateFood.price" label="Fiyat" type="number" filled class="q-mt-md" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="İptal" color="negative" @click="closeUpdateDialog" />
          <q-btn flat label="Güncelle" color="primary" @click="updateFoodItem" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Sil Modal -->
    <q-dialog v-model="deleteDialogVisible" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">Yemek Sil</div>
          <div>Bu yemeği silmek istediğinize emin misiniz?</div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="İptal" color="negative" @click="closeDeleteDialog" />
          <q-btn flat label="Sil" color="primary" @click="deleteFoodItem" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
import { onMounted, Ref, ref } from 'vue';
import { DefaultColumns, TResponseUser } from './Props';
import { api, ResponseAPI } from 'src/boot/axios'; // ResponseAPI arayüzünü içe aktarın
import createPagination, { paginateProps } from 'src/helpers/Pagination';

export default {
  setup () {
    const filter = ref('');
    const rows: Ref<TResponseUser[]> = ref([]);
    const loading = ref(false);
    const pagination = ref({
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 0
    });

    // Diğer değişken ve fonksiyon tanımlamaları...

    const onRequest = async (props: paginateProps) => {
  try {
    loading.value = true;
    const res = await api.get<ResponseAPI<TResponseUser[]>>('sample-data/users', {
      params: createPagination(props)
    });
    
    if (res.data.success) {
      rows.value = res.data.data; // response'dan gelen data'yı kullanın

      // limit ve offset değerlerini kullanın
      pagination.value.page = res.data.offset || 1;  // varsayılan değer olarak 1
      pagination.value.rowsPerPage = res.data.limit || 10; // varsayılan değer olarak 10
    } else {
      rows.value = [];
    }
  } finally {
    loading.value = false;
  }
};


    onMounted(() => {
      onRequest({
        pagination: pagination.value,
        filter: filter.value
      });
    });

    return {
      onRequest,
      filter,
      rows,
      loading,
      DefaultColumns,
      pagination,
      // Diğer değişken ve fonksiyonları döndürün
    };
  }
}
</script>
