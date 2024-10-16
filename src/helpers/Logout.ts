import { clearSession } from './Session';
import router from 'src/router'; // router nesnesini içe aktarıyoruz

export default () => {
  clearSession();
  router({ name: 'loginPage' }); // router.push ile yönlendirme yapıyoruz
};
