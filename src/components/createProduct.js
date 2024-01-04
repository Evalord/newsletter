import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProducts = () => {
    const schema = yup.object().shape({
        // image: yup.any().image().required("image is required"),
        name: yup.string().required("Product Name is required"),
        price: yup.string().matches().required("Poduct price is required")
    }).required()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema)
    });

    const [errorMessage, setErrorMessage] = useState()
    const [showButton, setShowButton] = useState(true)
    const [image, setImage] = useState()

    const client = axios.create({
        baseURL: 'https://staging.trick-project.eu/api-pco/api', headers: { Authorization: localStorage.getItem('token') }
    });

    const submitProduct = (values) => {
        setShowButton(false)
        setErrorMessage('')

        const formData = new FormData()
        formData.append("file", image)
        let link = ''

        client.post('/files/upload', formData)
            .then(response => {
                link = response?.data?.data?.link
                client.post('/products/textile', {
                    image: link,
                    name: values.name,
                    size: values.price,
                    group: "Bronze",
                    description: "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
                    color: "olive",
                    code: link,
                    certificates: [],
                    assertions: [],
                }).then(response => {
                    console.log(response)
                    const message = "Product created"
                    toast.success(message)
                }).catch((error) => {
                    console.log()
                });
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
    const onImageChange = (image) => {
        setImage(image.target.files[0])
    }

    return (

        <form onSubmit={handleSubmit(submitProduct)} >
            <ToastContainer />
            <div className="contentProduct">
                <div className="createForm">
                    <h3> Add an Arcticle </h3>
                    <div className="error-Message">{errorMessage} </div>
                    <div className='formArticles'>
                        <div>
                            <label htmlFor="image">Add Image</label>
                        </div>
                        <div>
                            <input id='image' onChange={onImageChange} type="file" name="image" />
                        </div>

                    </div>
                    <div className='productInfo'>
                        <div>
                            <label htmlFor="name"> Arcticle Name</label>
                        </div>
                        <div>
                            <input id='name' {...register('name')} type="text" placeholder="e.g. iphone cases" name="name" title="insert article name" />
                        </div>

                        <div>
                            <label htmlFor="price"> Arcticle Price</label>
                        </div>
                        <div>
                            <input id='price' {...register('price')} type="number" placeholder="e.g 1000 CFA " name="price" title="insert article price" />
                        </div>
                    </div>
                    <div className="btn-submit">
                        <button type="submit">
                            {showButton === false && <div className='attente'>Saving...</div>}
                            {showButton === true && <>save</>}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}
export default AddProducts;