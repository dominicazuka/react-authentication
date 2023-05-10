import {useState} from 'react';
import axios from 'axios' 
import {EmailVerificationSuccess} from './EmailVerificationSuccess'
import {EmailVerificationFail} from './EmailVerificationFail' 
import {useToken} from '../lib/auth/useToken' 
import {useQueryParams} from '../util/useQueryParams'

export  const EmailVerificationCodePage = () => {
    const [isSuccess, setIsSuccess] = useState(false)
    const [isFailure, setIsFailure] = useState(false)
    const [verificationString, setVerificationString] = useState('') 
    const {email} = useQueryParams()
    const [, setToken] = useToken()

    const onSubmitVerificationString = async () => {
        try{
            const response = await axios.put('/api/verify-email', {email, verificationString}) 
            console.log("response: " + response.data)
            const {token} = response.data
            setToken(token)
            setIsSuccess(true)
        } catch(error){
            setIsFailure(true)
        }
    }

    if(isSuccess) return <EmailVerificationSuccess/>
    if(isFailure) return <EmailVerificationFail/>

    return(
        <div className='content-container'>
            <h1>Please Verify Your Email</h1>
            <p>You should have recieved a verification code at the email address you provided, please ebter it here</p>
            <input
            placeholder='e.g 123456'
            value={verificationString}
            onChange={(e) => setVerificationString(e.target.value)}
            />
            <button onClick={onSubmitVerificationString}>Submit</button>
        </div>
    )
}