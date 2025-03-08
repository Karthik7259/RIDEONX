import React, { useState } from 'react'
import axios from 'axios'

const Payment = () => {
    const [responseId, setResponseId] = useState("")
    const [responseState, setResponseState] = useState([])

    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script")
            script.src = src
            script.onload = () => {
                resolve(true)
            }
            script.onerror = () => {
                resolve(false)
            }
            document.body.appendChild(script)
        })
    }

    const createRazorpayOrder = (amount) => {
        let data = JSON.stringify({
            amount: amount * 100,
            currency: "INR",
        })
        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: "http://localhost:4000/orders",
            headers: {
                'Content-Type': 'application/json',
            },
            data: data,
        }

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data))
                handleRazorpayScreen(response.data.amount)
            })
            .catch((error) => {
                console.log("error at ", error)
            })
    }

    const handleRazorpayScreen = async (amount) => {
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")

        if (!res) {
            alert("some error at razorpay screen loading")
            return
        }

        const options = {
            key: 'rzp_test_1jDPjzRImXgBiQ',
            amount: amount,
            currency: 'INR',
            name: "RIDEONX",
            description: "payment to RIDEONX",
            image: "",
            handler: function (response) {
                setResponseId(response.razorpay_payment_id)
            },
            prefill: {
                name: "RIDEONX",
                email: "karthik172180@gmail.com"
            },
            theme: {
                color: "#F4C430"
            }
        }

        const paymentObject = new window.Razorpay(options)
        paymentObject.open()
    }

    const paymentFetch = (e) => {
     

        const paymentId = e.target.paymentId.value;
         console.log(paymentId)
        axios.get(`http://localhost:4000/payment/${paymentId}`)
            .then((response) => { 
                console.log(response.data)
                setResponseState(response.data)
            })
            .catch((error) => {
                console.log("error occurs", error)
            })

            e.preventDefault()
    }

    return (
        <div className='bg-amber-300 h-full' >


            <button onClick={() => createRazorpayOrder(225)}>payment of 225Rs</button>
            {responseId && <p className='mt-10'>{responseId}</p>}
            <h1>This is payment verification page</h1>
            <form onSubmit={paymentFetch}>
                <input type='text' name="paymentId" />
                <button type='submit'>Fetch Payment</button>
                {responseState.length !== 0 && (
                    <ul>
                        <li>Amount {responseState.amount / 100}</li>
                        <li>Currency {responseState.currency}</li>
                        <li>Status: {responseState.status}</li>
                        <li>Method {responseState.method}</li>
                    </ul>
                )}
            </form>
        </div>
    )
}

export default Payment

