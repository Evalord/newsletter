import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import { useParams, useSearchParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const EditProducts = () => {
    const schema = yup.object().shape({
        // image: yup.any().image().required("image is required"),
        name: yup.string().required("Product Name is required"),
        price: yup.string().matches().required("Poduct price is required")
    }).required()

    const [product, setProduct] = useState();
    const [errorMessage, setErrorMessage] = useState()
    const [showButton, setShowButton] = useState(true)
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema)
    });
    const searchParams = useParams()
    console.log(searchParams.uuid)
    const client = axios.create({
        baseURL: 'https://staging.trick-project.eu/api-pco/api/products/textile', headers: { Authorization: localStorage.getItem('token') }
    });

    const getProduct = () => {
        client.get(`detail/${searchParams.uuid}`).then((response) => {
            setProduct(response?.data?.data)
            setValue("name", response?.data?.data?.name)
            setValue("price", response?.data?.data?.size)
            console.log(response)
        }).catch((error) => {
            console.log()
        });
    }
    useEffect(() => {
        getProduct()
    }, []);

    const editProduct = (value) => {
        setShowButton(false)
        setErrorMessage('')
        client.put(`/${searchParams.uuid}`, {
            Image: value.image,
            name: value.name,
            size: value.price,
            group: value.group,
            description: value.description,
            color: "string",
        })
            .then(response => {
                console.log(response)
                const message = "Edited product"
                toast.success(message)
            }).catch((error) => {
                console.log(error)
                if (error?.response?.data?.statusCode === 422) {
                    const message = "file is required"
                    setErrorMessage(message)
                    toast.error(message)
                } else if (error?.code === "ERR_NETWORK") {
                    setErrorMessage("Error network")
                    toast.error(error.message)
                }

            }).finally(() => setShowButton(true));
    };


    return (
        <form className="main" onSubmit={handleSubmit(editProduct)}>
            <ToastContainer />
            <h1> Edit Product </h1>
            <div className="product-card" key={product?.uuid}>
                <div className="error-Message">{errorMessage} </div>
                <div className="editform" type="datalist" key={searchParams.uuid}>
                    <div className="mainLeft">
                        <img src={product?.image} />
                    </div>
                    <div className="mainRight">
                        <div className='productInfo'>
                            <div>
                                <label htmlFor="price"> Arcticle Name</label>
                            </div>
                            <div>
                                <input id='name'{...register('name')} type="text" placeholder={product?.name} name="name" title="insert article name" />

                            </div>

                            <div>
                                <label htmlFor="price"> Arcticle Price</label>
                            </div>
                            <div>
                                <input id='price' {...register('price')} type="number" placeholder={product?.size} name="price" title="insert article price" />

                            </div>
                        </div>
                        <div className="btn-submit">
                            <button type="submit">
                                {showButton === false && <div className='attente'>editing...</div>}
                                {showButton === true && <>save</>}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>

    );
}

export default EditProducts;
