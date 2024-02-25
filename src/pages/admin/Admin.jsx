import styles from './admin.module.css';
import FormAddTour from '../../components/FormAddTour/FormAddTour';
import FormAddCategory from '../../components/FormAddCategory/FormAddCategory';
const Admin = () => {
  return (
    <div>
      Admin Panel
      <FormAddTour></FormAddTour>
      <FormAddCategory></FormAddCategory>
    </div>
  );
};

export default Admin;
