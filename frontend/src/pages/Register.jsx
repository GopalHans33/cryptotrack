import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import Tab from '@mui/material/Tab';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import PermIdentityRoundedIcon from '@mui/icons-material/PermIdentityRounded';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { createTheme, ThemeProvider } from '@mui/material';
import axios from 'axios';

function Register() {
    const [value, setValue] = useState('signup');
    const [isLogin, setisLogin] = useState(0);
    
    const [userData, setuserData] = useState({
        name: 'N/A',
        email: 'N/A',
        username: 'N/A'
    });    
    const [submitFormData, setSubmitFormData] = useState({
        name: '',
        email: '',
        username: '',
        password: ''
    });
    const [loginFormData, setLoginFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleSubmitChange = (e) =>{
        setSubmitFormData({
            ...submitFormData,
            [e.target.name]: e.target.value
        })
    }
    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginFormData((prev) => ({
            ...prev,
            [name]: value,
            ...(name === "username" || name === "email" ? { username: value, email: value } : {}),
        }));
    };
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/user/register', submitFormData);
      console.log('User registered successfully:', response.data);
      handleLogin(e);
    } catch (error) {
      console.error('Error registering user:', error.response.data);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('/user/login', value === 'login' ? loginFormData : submitFormData);
        const { user, token } = response.data.data;

        // Store token and user in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        setuserData(user);
        setisLogin(1);
    } catch (error) {
        console.error('Error logging in user:', error.response.data);
    }
};

const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setuserData({
        name: 'N/A',
        email: 'N/A',
        username: 'N/A'
    });
    setisLogin(0);
    setValue("login");
};


useEffect(() => {
  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");

  if (storedUser && storedToken) {
    setuserData(JSON.parse(storedUser));
    setisLogin(1);
  }
}, []);


  const theme = createTheme({
    palette:{
        primary:{
            main:"#8b5cf6"
        }
    }
  })
  const style = {
    color:"#cbd5e1",
    width:"50vw",
    fontSize:"1.2rem",
    fontWeight:600,
    fontFamily:"Georgia",
    textTransform:"capitalize"
  }
  return (
    <>
    <div className='m-4'>
    <Link className='text-slate-300 hover:text-[#8b5cf6]' to='/'><ArrowBackIosRoundedIcon fontSize='large'></ArrowBackIosRoundedIcon></Link>
    </div>
    <Link to='/'><h1 className=' text-center w-full bg-rgb(46, 46, 46) text-slate-100 text-7xl font-bold mb-16'><span className='text-violet-500'>Crypo</span>Tracker</h1></Link>
    <div className={` ${isLogin? 'hidden' : ''} w-auto sm:w-3/4 mx-auto`}>
        <ThemeProvider theme={theme}>
            <TabContext value={value}>
                <div>
                <TabList onChange={handleChange} variant='fullWidth'>
                    <Tab label="Login" value="login" sx={style}/>
                    <Tab label="Sign Up" value="signup" sx={style}/>
                </TabList>
                </div>
                <TabPanel value="login">
                <form onSubmit={handleLogin} className="py-12 w-full text-slate-300 bg-slate-700 rounded-md px-10">
                    <h1 className="text-3xl text-center mb-7">Login To CrypoTraker</h1>
                    <div className="text-xl grid grid-cols-2 gap-y-6 text-center">
                        <label htmlFor="gmail">Email / Username</label>
                        <div>
                        <input
                        name="username"
                        id="gmail"
                        className="bg-slate-500 rounded-md text-center w-full"
                        type="text"
                        placeholder="Enter your email or username"
                        required
                        onChange={handleLoginChange}
                        />
                        </div>
                        <label htmlFor="password">Password</label>
                        <input
                        name="password"
                        className="bg-slate-500 rounded-md text-center w-full"
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        required
                        onChange={handleLoginChange}
                        />
                    </div>
                    <div className="flex justify-center">
                        <input
                        className="bg-[#8b5cf6] text-xl rounded-md m-6 py-1 px-5 cursor-pointer hover:bg-[#7c3aed] transition-colors"
                        type="submit"
                        value="Login"
                        />
                    </div>
                </form>
                </TabPanel>
                <TabPanel value="signup">
                <div className='flex justify-center items-center'>
                    <form onSubmit={handleSubmit} className="py-12 w-full text-slate-300 bg-slate-700 rounded-md px-10">
                        <h1 className="text-3xl text-center mb-7">Signup To CrypoTraker</h1>
                        <div className="text-xl grid grid-cols-2 gap-y-6">
                            <label className='sm:ml-16' htmlFor="name">Name</label>
                            <input
                                name="name"
                                placeholder="Enter your name"
                                onChange={handleSubmitChange}
                                className="peer bg-slate-500 mb-5 rounded-md text-center w-full"
                                id="name"
                                type="text"
                            />

                            <label className='sm:ml-16' htmlFor="gmail">Email</label>
                            <div>
                            <input
                            name="email"
                            id="gmail"
                            className="peer bg-slate-500 rounded-md text-center w-full"
                            type="email"
                            placeholder="Enter your email"
                            required
                            onChange={handleSubmitChange}
                            />
                            <p className="mt-2 invisible peer-invalid:visible text-[#8b5cf6] text-sm">
                                Please provide a valid email address.
                            </p>
                            </div>

                            <label className='sm:ml-16' htmlFor="username">Username</label>
                            <div>
                            <input
                            name="username"
                            id="username"
                            className="bg-slate-500 rounded-md text-center w-full"
                            type="text"
                            placeholder="Enter a valid username"
                            required
                            onChange={handleSubmitChange}
                            />
                            <p className="mt-2 text-[#8b5cf6] text-sm">
                                Please provide a valid username.
                            </p>
                            </div>

                            <label className='sm:ml-16' htmlFor="password">Password</label>
                            <input
                            name="password"
                            className="bg-slate-500 rounded-md text-center w-full"
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            required
                            onChange={handleSubmitChange}
                            />
                        </div>
                        <div className="flex mt-5 justify-center">
                            <input
                            className="bg-[#8b5cf6] text-xl rounded-md m-6 py-1 px-5 cursor-pointer hover:bg-[#7c3aed] transition-colors"
                            type="submit"
                            value="Sign Up"
                            />
                        </div>
                    </form>
                </div>
                </TabPanel>
            </TabContext>
        </ThemeProvider>
    </div>
    <div className={`${isLogin ? '' : 'hidden'}`}>
        <form className="after_login mx-32 py-12 text-slate-300 bg-slate-700 rounded-md px-10">
            <h1 className="text-3xl text-center mb-7">
                <PermIdentityRoundedIcon sx={{ fontSize: 100 }} />
            </h1>
            <div className="text-xl grid grid-cols-2 gap-y-6 text-center">
                <label className="ml-16">Name:</label>
                <span className="text-violet-500 ml-16">{userData?.name || "N/A"}</span>

                <label className="ml-16">Email:</label>
                <span className="text-violet-500 ml-16">{userData?.email || "N/A"}</span>

                <label className="ml-16">Username:</label>
                <span className="text-violet-500 ml-16">{userData?.username || "N/A"}</span>
            </div>
            <button
                onClick={handleLogout}
                className='bg-violet-400 rounded-md p-3 mx-[42%] hover:bg-violet-500 transition-colors'
                >
                Logout
            </button>

        </form>
    </div>

    </>
  )
}

export default Register