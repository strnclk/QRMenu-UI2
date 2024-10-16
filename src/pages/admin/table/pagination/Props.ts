import { QTableProps } from 'quasar'

export const DefaultColumns: QTableProps['columns'] = [
  { name: 'profilePicture', label: 'Yemek', field: 'profilePicture', align: 'left' },
  { name: 'eat_name', label: 'Ürün', field: 'eat_name', align: 'left' },
  { name: 'description', label: 'Açıklama', field: 'description', align: 'left' },
  { name: 'price', label: 'Fiyat', field: 'price', align: 'left' },
  { name: 'actions', label: 'İşlemler', field: 'actions', align: 'left' }
]

export interface TResponseUser {
  id: number,
  eat_name: string,
  profile_picture: string,
  description: string,
  price:number;
}
