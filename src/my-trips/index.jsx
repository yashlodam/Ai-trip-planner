import { db } from '@/sevice/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function MyTrip() {
    const[userTrips,setUserTrips] = useState();
    const navigate = useNavigate();
    useEffect(()=>{
        GetUserTrips();
    },[])

    /*Used to get all user trip */

   const GetUserTrips= async()=>{
     const user = JSON.parse(localStorage.getItem('user'));
     
     if(!user){
        navigate('/');
        return;
     }
     setUserTrips([]);
     const q = query(collection(db, "trips"), where("userEmail", "==", user?.email));

     const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
        setUserTrips(prevVal=>[...prevVal,doc.data()])
      });

   }

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
        <h2>My Trips</h2>
    </div>
  )
}

export default MyTrip;