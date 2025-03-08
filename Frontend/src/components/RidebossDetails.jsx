// import React,{useContext} from 'react'
// import { RideBossDataContext } from '../context/RideBossContext'
// const RidebossDetails = () => {

//   const {RideBoss}=useContext(RideBossDataContext)
  
//  console.log(RideBoss)
//   return (
    
//     <div>
//         <div className='flex items-center justify-between'>
                  
//                   <div className='flex items-center justify-between gap-3'>
//                     <img className='h-10 w-10 rounded-full object-cover' src="https://tse3.mm.bing.net/th?id=OIP.YQGwtpOGecZajkbh2HMMGAHaHa&pid=Api&P=0&h=180" alt="" />
//                       <h4 className='text-lg font-medium capitalize '>{RideBoss.fullname.firstname + " "+ RideBoss.fullname.lastname}</h4>
//                   </div>
//                   <div>
//                     <h4 className='text-xl font-semibold '>$295.90</h4>
//                     <p className='text-sm text-gray-500'>Earned</p>
//                   </div>
//                 </div>
//                 <div className='flex p-3 mt-8  bg-gray-100 rounded-xl justify-center gap-5 items-start'>
//                   <div className='text-center '>
//                     <i className='text-3xl mb-2 font-thin ri-timer-2-line'></i>
//                     <h5 className='text-lg font-medium '>10.2</h5>
//                     <p className='text-sm text-gray-600'>Hours Online</p>
//                   </div>
//                   <div className='text-center '>
//                     <i className='text-3xl mb-2 font-thin ri-speed-up-line'></i>
//                     <h5 className='text-lg font-medium '>10.2</h5>
//                     <p className='text-sm text-gray-600'>Hours Online</p>
//                   </div>
//                   <div className='text-center '>
//                     <i className='text-3xl mb-2 font-thin ri-booklet-line'></i>
//                     <h5 className='text-lg font-medium '>10.2</h5>
//                     <p className='text-sm text-gray-600'>Hours Online</p>
//                   </div>
                  
//                 </div>

//     </div>
//   )
// }

// export default RidebossDetails



import React, { useContext } from 'react';
import { RideBossDataContext } from '../context/RideBossContext';

const RidebossDetails = () => {
  const { RideBoss } = useContext(RideBossDataContext);

  console.log(RideBoss);

  return (
    <div 
    className="
    p-2
  mb-[-1]
    rounded-xl 
    shadow-lg 
    hover:shadow-xl 
    transition-shadow 
    duration-300 
    max-w-md 
    mx-auto 
    border 
    bg-amber-400
    border-gray-200 
    box-border 
    w-full 
    cursor-pointer
 
  "
  
    >
      {/* Profile Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <img
            className="h-10 w-10 rounded-full object-cover border-2 border-blue-100"
            src="https://tse3.mm.bing.net/th?id=OIP.YQGwtpOGecZajkbh2HMMGAHaHa&pid=Api&P=0&h=180"
            alt="Profile"
          />
          <div>
            <h4 className="text-lg font-semibold capitalize">
              {`${RideBoss.fullname.firstname} ${RideBoss.fullname.lastname}`}
            </h4>
            <p className="text-sm text-gray-500">Ride Boss</p>
          </div>
        </div>
        <div className="text-right">
          <h4 className="text-xl font-bold text-blue-600">₹780.90</h4>
          <p className="text-sm text-gray-500">Total Earned</p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-3 gap-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
        <div className="text-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
          <i className="text-3xl mb-2 text-blue-500 ri-timer-2-line"></i>
          <h5 className="text-lg font-semibold">3.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
        <div className="text-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
          <i className="text-3xl mb-2 text-green-500 ri-speed-up-line"></i>
          <h5 className="text-lg font-semibold">4</h5>
          <p className="text-sm text-gray-600">Efficiency</p>
        </div>
        <div className="text-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
          <i className="text-3xl mb-2 text-purple-500 ri-booklet-line"></i>
          <h5 className="text-lg font-semibold">₹400</h5>
          <p className="text-sm text-gray-600">Earned</p>
        </div>
      </div>

    
    </div>
  );
};

export default RidebossDetails;



