import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setForm] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    const getPassword = async () => {
        const req = await fetch("http://localhost:3000/")
        let password = await req.json()
        setPasswordArray(password)
        console.log(password);

    }

    useEffect(() => {
        getPassword()
    }, [])


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }


    const savePassword = async () => {
        if (form.site === "" || form.username === "" || form.password === "") {
            toast.error("Please fill all fields")
            return;
        }
        let res = await fetch("http://localhost:3000/", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id : form.id }),
        });
        setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
        // localStorage.setItem("password", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]))
        setForm({ site: "", username: "", password: "" })
         await fetch("http://localhost:3000/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...form,
                id: uuidv4(),
            }),
        });
        console.log([...passwordArray, { ...form, id: uuidv4() }]);
        toast('Password Saved Succesfully!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    const DeletePassword = async (id) => {
        console.log("Deleting password with id", id);
        let c = confirm("Do you really want to delete this Password")
        if (c) {
            setPasswordArray(passwordArray.filter((item) => {
                return item.id !== id
            }))
            // localStorage.setItem("password", JSON.stringify(passwordArray.filter((item) => {
            //     return item.id !== id
            // })))
            let res = await fetch("http://localhost:3000/", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id }),
        });
        }
    }

    const EditPassword = (id) => {
        console.log("Editing password with id", id);
        passwordArray.find((item) => {
            return item.id === id
        })
        setForm(passwordArray.find((item) => {
            return item.id === id
        }))
        passwordArray.filter((item) => {
            return item.id !== id
        })
        setPasswordArray(passwordArray.filter((item) => {
            return item.id !== id
        }))
        localStorage.setItem("password", JSON.stringify(passwordArray.filter((item) => {
            return item.id !== id
        })))
    }

    const copyText = (text) => {
        toast('Copied to clipboard!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigator.clipboard.writeText(text)

    }

    const showPassword = () => {
        passwordRef.current.type = "text"
        console.log(ref.current.src);

        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png"
            passwordRef.current.type = "password"
        }
        else {
            ref.current.src = "icons/eyecross.png"
        }
    }
    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"

            />
            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-77.5 w-77.5 rounded-full bg-fuchsia-400 opacity-20 blur-[100px]">   </div></div>
            <div className="mycontainer max-w-4xl mx-auto px-3 sm:px-4 md:px-6 w-full">
                <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-center'> <span className='text-green-700'>  &lt;</span>
                    Pass
                    <span className='text-green-700'>Op /&gt;</span></h1>
                <p className='text-green-900 text-sm sm:text-base md:text-lg text-center'>Your own Password Manager</p>
                <div className='flex flex-col text-white p-2 sm:p-4 gap-5 sm:gap-8 items-center' >
                    <input onChange={handleChange} placeholder='Enter Website Url' className='rounded-full border border-green-700 w-full p-3 sm:p-4 py-1 text-sm sm:text-base text-black' type="text" value={form.site} name="site" id="" />
                    <div className='flex flex-col sm:flex-row w-full gap-3 text-black'>
                        <input onChange={handleChange} placeholder='Username' className='rounded-full border border-green-700 w-full p-3 sm:p-4 py-1 text-sm sm:text-base' type="text" value={form.username} name="username" id="" />
                        <div className="relative w-full">
                            <input ref={passwordRef} onChange={handleChange} placeholder='Password' className='rounded-full border border-green-700 w-full p-3 sm:p-4 py-1 text-sm sm:text-base' type="password" value={form.password} name="password" id="" />
                            <span className='absolute right-3 top-1/2 -translate-y-1/2 flex items-center cursor-pointer' onClick={showPassword}>
                                <img ref={ref} className='w-4 h-4 sm:w-5 sm:h-5' src="/icons/eye.png" alt="toggle password visibility" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='text-black flex justify-center items-center bg-green-600 hover:bg-green-500 rounded-full px-4 sm:px-5 py-2 w-fit gap-2 text-sm sm:text-base ring-black ring-1'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>
                        Save</button>
                </div>
                <div className="passwords">
                    <h1 className='py-2 font-bold text-base sm:text-lg md:text-xl'>Yours Password</h1>
                    {passwordArray.length === 0 && <div className='text-sm sm:text-base'>No password to show</div>}

                    {passwordArray.length !== 0 &&
                        <>
                            {/* Card layout - phones (below sm) */}
                            <div className='flex flex-col gap-3 sm:hidden'>
                                {passwordArray.map((item, index) => {
                                    return <div key={index} className='bg-green-100 border border-green-700/40 rounded-lg p-3 text-sm'>
                                        <div className='flex justify-between items-start gap-2'>
                                            <div className='min-w-0 flex-1'>
                                                <p className='text-xs text-green-800 font-semibold'>Site</p>
                                                <div className='flex items-center gap-1 min-w-0'>
                                                    <a href={item.site} target='_blank' className='truncate'>{item.site}</a>
                                                    <span className='cursor-pointer shrink-0' onClick={() => copyText(item.site)}>📋</span>
                                                </div>
                                            </div>
                                            <div className='flex gap-2 shrink-0'>
                                                <span className="cursor-pointer" onClick={() => EditPassword(item.id)}>
                                                    <lord-icon src="https://cdn.lordicon.com/gwlusjdu.json" trigger="hover" style={{ width: "22px", height: "22px" }}></lord-icon>
                                                </span>
                                                <span className="cursor-pointer" onClick={() => DeletePassword(item.id)}>
                                                    <lord-icon src="https://cdn.lordicon.com/skkahier.json" trigger="hover" style={{ width: "22px", height: "22px" }}></lord-icon>
                                                </span>
                                            </div>
                                        </div>

                                        <div className='mt-2'>
                                            <p className='text-xs text-green-800 font-semibold'>Username</p>
                                            <div className='flex items-center gap-1 min-w-0' onClick={() => copyText(item.username)}>
                                                <span className='truncate'>{item.username}</span>
                                                <span className='cursor-pointer shrink-0'>📋</span>
                                            </div>
                                        </div>

                                        <div className='mt-2'>
                                            <p className='text-xs text-green-800 font-semibold'>Password</p>
                                            <div className='flex items-center gap-1 min-w-0' onClick={() => copyText(item.password)}>
                                                <span className='truncate'>{item.password}</span>
                                                <span className='cursor-pointer shrink-0'>📋</span>
                                            </div>
                                        </div>
                                    </div>
                                })}
                            </div>

                            {/* Table layout - sm and above */}
                            <div className="hidden sm:block overflow-x-auto rounded-sm">
                                <table className="table-auto w-full min-w-[600px] rounded-sm overflow-hidden">
                                    <thead className='bg-green-800 text-white'>
                                        <tr>
                                            <th className='py-2 px-2'>Site</th>
                                            <th className='py-2 px-2'>Username</th>
                                            <th className='py-2 px-2'>Password</th>
                                            <th className='py-2 px-2'>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className='bg-green-100'>
                                        {passwordArray.map((item, index) => {
                                            return <tr key={index}>
                                                <td className='border border-white py-2 px-2 text-center max-w-[160px]'>
                                                    <div className='flex items-center justify-center gap-1'>
                                                        <a href={item.site} target='_blank' className='truncate max-w-[120px] inline-block align-middle'> {item.site}</a>
                                                        <div className='lordicopy cursor-pointer size-7 shrink-0' onClick={() => copyText(item.site)}>
                                                            <lord-icon
                                                                style={{
                                                                    width: "25px",
                                                                    height: "25px",
                                                                    "paddingTop": "3px",
                                                                    "paddingLeft": "3px",
                                                                }}
                                                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                                                trigger="hover"
                                                            >
                                                            </lord-icon>
                                                        </div>
                                                    </div>

                                                </td>
                                                <td className='border border-white py-2 px-2 text-center max-w-[140px]'>
                                                    <div className='flex items-center justify-center gap-1' onClick={() => copyText(item.username)}>
                                                        <span className='truncate max-w-[100px] inline-block'>{item.username}</span>
                                                        <div className='lordicopy cursor-pointer size-7 shrink-0' >
                                                            <lord-icon
                                                                style={{
                                                                    width: "25px",
                                                                    height: "25px",
                                                                    "paddingTop": "3px",
                                                                    "paddingLeft": "3px",
                                                                }}
                                                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                                                trigger="hover"
                                                            >
                                                            </lord-icon>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className='border border-white py-2 px-2 text-center max-w-[140px]'>
                                                    <div className='flex items-center justify-center gap-1'>
                                                        <span className='truncate max-w-[100px] inline-block'>{"*".repeat(item.password.length)}</span>
                                                        <div className='lordicopy cursor-pointer size-7 shrink-0' onClick={() => copyText(item.password)}>
                                                            <lord-icon
                                                                style={{
                                                                    width: "25px",
                                                                    height: "25px",
                                                                    "paddingTop": "3px",
                                                                    "paddingLeft": "3px",
                                                                }}
                                                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                                                trigger="hover"
                                                            >
                                                            </lord-icon>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className='border border-white py-2 px-2 text-center'>
                                                    <span className="cursor-pointer mx-1" onClick={() => EditPassword(item.id)}>
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/gwlusjdu.json"
                                                            trigger="hover"
                                                            style={{ width: "25px", height: "25px" }}
                                                        >
                                                        </lord-icon>
                                                    </span>

                                                    <span className="cursor-pointer mx-1" onClick={() => DeletePassword(item.id)}>
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/skkahier.json"
                                                            trigger="hover"
                                                            style={{ width: "25px", height: "25px" }}
                                                        >
                                                        </lord-icon>
                                                    </span>
                                                </td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </>}
                </div>
            </div>
        </>
    )
}

export default Manager
