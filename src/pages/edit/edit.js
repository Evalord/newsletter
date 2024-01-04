import EditProducts from '../../components/editPdt';
import './editStyle.css';
import NavBar from '../../components/navBar';

const Edit = () => {

    return (
        <div className='product'>
            <NavBar />
            <EditProducts />
        </div>
    )
}
export default Edit;