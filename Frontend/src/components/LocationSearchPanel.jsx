// import React from 'react'

// const LocationSearchPanel = (props) => {
// //   sample array for loaction
// console.log(props)
//  const locations=[
//     "Address: Manyata Embassy Business Park, Outer Ring Rd, Nagavara, ",
//     "Address: Manyata Embassy Business Park, Outer Ring Rd, Nagavara, ",
//     "Address: Manyata Embassy Business Park, Outer Ring Rd, Nagavara, ",
//     "Address: Manyata shater Business Park, Outer Ring Rd, Nagavara,"
//  ]


//   return (
//     <div>
//         {/* this is just a sample data */}

//   {
//     locations.map(function(element,id){
//         return <div key={id} onClick={()=>{
//             props.setvehiclePanelOpen(true)
//             props.setpanelopen(false)
//         }} className='flex gap-4 border-gray-100 active:border-black border-2 p-2  rounded-xl  items-center justify-start my-2'>
//         <h2 className='bg-[#eee] h-8 flex items-center justify-center w-16 rounded-full'><i className="ri-map-pin-line  "></i></h2>
//        <h4 className='font-medium '>{element}</h4>
//        </div>
//     })
//   }
//     </div>
//   )
// }

// export default LocationSearchPanel



//// filepath: /d:/RideonX/Frontend/src/components/LocationSearchPanel.jsx
import React from 'react'

const LocationSearchPanel = ({ suggestions, onSelectSuggestion, setvehiclePanelOpen, setPanelopen }) => {
  return (
    <div>
      {suggestions && suggestions.length > 0 ? (
        suggestions.map((suggestion, id) => (
          <div key={id} 
            onClick={() => {
              onSelectSuggestion(suggestion)
              
              setPanelopen(true)
            }} 
            className='flex gap-4 border-gray-100 active:border-black border-2 p-2 rounded-xl items-center justify-start my-2'
          >
            <h2 className='bg-[#eee] h-8 flex items-center justify-center w-16 rounded-full'>
              <i className="ri-map-pin-line"></i>
            </h2>
            <h4 className='font-medium'>{suggestion}</h4>
          </div>
        ))
      ) : (
        <p className="p-2 text-gray-500">No suggestions available</p>
      )}
    </div>
  )
}



export default LocationSearchPanel


