import * as yup from "yup"
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignInForm = () => {
    const schema = yup.object().shape({
        email: yup.string().email().required("Email is required"),
        password: yup.string().matches(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/).required("Password is required").min(8, "Password is too short should be 8 chars minimum"),
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
    const navigate = useNavigate()

    const onSubmit = (values) => {
        setShowButton(false)
        setErrorMessage('')

        axios.post('https://staging.trick-project.eu/api-pco/api/users/login', {
            email: values.email,
            password: values.password,
        }).then((response) => {
            if (response?.data?.code === 200) {
                let token = response.data.data.jwt;
                console.log(token)
                localStorage.setItem("token", `Bearer ${token}`);
                axios.defaults.headers['Authorization'] = `Bearer ${token}`;
                navigate('/')
            }
        }).catch((error) => {
            if (error?.response?.data?.statusCode === 401) {
                const message = "Your Email or Password is not correct"
                setErrorMessage(message)
                toast.error(message)
            } else if (error?.code === "ERR_NETWORK") {
                setErrorMessage("Error network")
                toast.error(error.message)
            } else if (error?.data?.statusCode === 400) {
                setErrorMessage(" Email invalid")
                toast.error(error.message)
            }
        }).finally(() => setShowButton(true));
    }

    return (

        <form onSubmit={handleSubmit(onSubmit)}>
            <ToastContainer />
            <div className="signInForm">
                <h3> Welcome! </h3>
                <p> Sign in to your account </p>
                <div className="error-Message">{errorMessage} </div>

                <div className='formName'>
                    <div>
                        <label htmlFor="email">email</label>
                    </div>
                    <div>
                        <input id='email' {...register('email')} type="text" placeholder="e.g.afe5dfds@gmail.com " name="email" />
                    </div>
                    {errors.email && <div className="errorMessage">{errors.email.message}</div>}
                </div>
                <div className='formPass'>
                    <div>
                        <label htmlFor="password">password</label>
                    </div>
                    <div>
                        <input id='password' {...register('password')} type="password" placeholder="e.g. eer*45384dazoQF" name="password" title="insert your password" />
                    </div>
                    {errors.password && <div className="errorMessage">{errors.password.message}</div>}
                </div>
                <div className='downForm'>
                    <div>
                        <input id='checkbox' className='check' type="checkbox" />
                        <label htmlFor='checkbox'>
                            remember me?
                        </label>
                    </div>
                    <div>
                        <a href='#'>forgot password?</a>
                    </div>
                </div>


                <div className="btn-submit">

                    <button type="submit">
                        {showButton === false && <div className='attente'>check in...</div>}
                        {showButton === true &&
                            <> Log In</>
                        }
                    </button>


                </div>
            </div>
        </form>
    );
}
export default SignInForm;
