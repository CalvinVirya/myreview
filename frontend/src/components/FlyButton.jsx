// import { useMap } from "react-leaflet";

// export default function FlyButton({ location }) {
//   const map = useMap();

//   const flyToUser = () => {
//     if (!location.loaded || location.error) return;
//     map.flyTo([location.coordinates.lat, location.coordinates.lng], 18, { animate: true });
//   };

//   return (
//     <button
//       onClick={flyToUser}
//       className="
//         absolute right-4 bottom-4 
//         bg-white 
//         w-12 h-12 
//         rounded-full 
//         shadow-xl 
//         flex items-center justify-center
//         border border-gray-300
//         z-[99999]
//         active:scale-95
//       "
//     >
//       <img
//         src="https://cdn-icons-png.flaticon.com/512/565/565949.png"
//         alt="target icon"
//         className="w-6 h-6"
//       />
//     </button>
//   );
// }
