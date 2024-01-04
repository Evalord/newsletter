import AddProducts from '../../components/createProduct';
import NavBar from '../../components/navBar';
import './styleProducts.css'

const Create = () => {

    return (
        <div className='product'>
            <NavBar/>
            <AddProducts />
        </div>

    )

}
export default Create;