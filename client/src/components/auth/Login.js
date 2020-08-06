import React, {
    Fragment,
    useState
} from "react"
import {
    Link,
    Redirect
} from 'react-router-dom'
import {
    connect
} from 'react-redux'
import PropTypes from 'prop-types'
import {
    login
} from '../../actions/auth'
//React hooks for state
const Login = ({
    login,
    isAuthenticated
}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const {
        email,
        password
    } = formData;
    //copying the name of setFormData
    const onChange = e => setFormData({
        ...formData,
        //made e.target.name a key to be used throughout the file
        [e.target.name]: e.target.value
    })
    // Bc of the useState hook I am able to have access to formData throughout the file
    const onSubmit = async e => {
        e.preventDefault();
        login(email, password)
    }
    // Redirect if logged in 
    if (isAuthenticated) {
        return <Redirect to = '/dashboard' / >
    }
    return ( <
        Fragment >
        <
        h1 className = "large text-primary" > Sign In < /h1>   <
        p className = "lead" > < i className = "fas fa-user" > < /i> Sign In Your Account</p >
        <
        form className = "form"
        onSubmit = {
            e => onSubmit(e)
        } >
        <
        div className = "form-group" >
        <
        input type = "email"
        placeholder = "Email Address"
        name = "email"
        value = {
            email
        }
        onChange = {
            e => onChange(e)
        }
        required /
        >

        <
        /
        div > <
        div className = "form-group" >
        <
        input type = "password"
        placeholder = "Password"
        name = "password"
        value = {
            password
        }
        onChange = {
            e => onChange(e)
        }
        minLength = "6" /
        >
        <
        /
        div > <
        input type = "submit"
        className = "btn btn-primary"
        value = "Login" / >
        <
        /form> <
        p className = "my-1" >
        Don 't have an account? < Link to = "/register" > Sign up < /Link> < /
        p >
        <
        /Fragment>
    )
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, {
        login
    })
    (Login)