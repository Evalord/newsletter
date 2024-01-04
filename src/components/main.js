import image from '../assets/istockphoto-1143714064-612x612.jpg';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '../assets/logo/deleteIcon.svg';
import iconsEdit from '../assets/logo/iconsEdit.svg';


const Main = () => {
    const navigate = useNavigate()
    const client = axios.create({
        baseURL: 'https://staging.trick-project.eu/api-pco/api/products/textile', headers: { Authorization: localStorage.getItem('token') }
    });
    const [products, setProducts] = useState([]);
    const getProducts = () => {
        client.get('?limit=10').then((response) => {
            setProducts(response?.data?.data);
            console.log(response)
        }).catch((error) => {
            console.log()
        });
    }
    useEffect(() => {
        getProducts()
    }, []);

    const deleteProduct = async (uuid) => {
        client.delete(`/${uuid}`).then((response) => {
            getProducts()
        }).catch((error) => {
            console.log(error)
        });
    }

    return (
        <div>
            <div className='container'>
                <div className="bodyleft">
                    <img src={image} alt='horse' />
                </div>
                <div className="bodyright">
                    <div><h2>Discover Our Products And Services</h2></div>
                    <p>
                        Les bienheureux, après avoir bu de l'eau de l'étang de vie, prendront le chemin du paradis. Un ange, qui en a les clefs, leur ouvrira la porte.
                        La vie est un voyage où les provisions sont les bonnes œuvres.
                    </p>
                </div>
            </div>
            <div className='down'>
                <div className='create'>
                    <button onClick={() => navigate('/create')}>create new products</button>
                </div>
                <div className='articles'>
                    {products?.map((product) => {
                        return (
                            <div className="product-card" key={product.uuid}>
                                <img src={product.image} />
                                <div className="articlesInfo">
                                    <div>{product.name}</div>
                                    <div>{product.size} CFA</div>
                                </div>
                                <div className='extra'>
                                    <div className='extraRight'  >
                                        <button type="button" onClick={() => deleteProduct(product.uuid)} >
                                            <img src={DeleteIcon} />
                                        </button>
                                        <button className='edit' type="button" onClick={() => navigate(`/edit/${product.uuid}`)} >
                                            <img src={iconsEdit} />
                                        </button>
                                    </div>
                                    <div className="add-btn">
                                        <button type='submit' >Add to basket</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div >
    );
}


export default Main;