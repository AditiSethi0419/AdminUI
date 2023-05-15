import { useSnackbar } from "notistack";
import { useState,useEffect } from "react";
import axios from 'axios';



const Userfetch = (url) => {

    //REACT_APP_BACKEND = 'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
    const [data,setData]=useState([]);
    const { enqueueSnackbar } = useSnackbar();

    const showSnackbar=(msg,variant)=>{
        enqueueSnackbar(msg,{
            variant: variant,
            snackbarprops:`data-role='alert'`})
    }

    const fetchData=()=>{
        try{
            axios.get(`https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`)
            .then((response)=>{
               // console.log(response.data);
               // console.log(typeof response.data)
                setData(response.data);
            }).catch((error)=>{
                showSnackbar('Network Error' , error);
            })
        }
        catch(error)
        {
            showSnackbar('Something went wrong', error);
        }
    }
    useEffect(()=>{
        fetchData()
    },[url])

   // console.log(data);
   // console.log(typeof data);

  return [data];
}

export default Userfetch;
