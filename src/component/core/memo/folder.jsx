/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import { CiFolderOn } from 'react-icons/ci';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useListFolder, useListFolderStatus } from '../../../services/API/folder';
import useCurrentUser from '../../../hooks/useCurrentUser';


// const FolderCard = ({ name, fileCount }) => (
//     <div className="min-w-[200px] p-4 mx-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
//       {/* Top part with folder shape */}
//       <div className="relative">
//         <div className="absolute top-0 left-4 w-24 h-3 bg-blue-500 rounded-t-md"/>
//         <div className="pt-3 px-4 pb-4 bg-blue-500 rounded-md">
//           <div className="flex items-center justify-center w-12 h-12 bg-white/10 rounded-full mb-3">
//             <Folder className="w-6 h-6 text-white" />
//           </div>
//         </div>
//       </div>
      
//       {/* Folder information */}
//       <div className="mt-3">
//         <h3 className="font-medium text-gray-800 truncate">{name}</h3>
//         <p className="text-sm text-gray-500">{fileCount} files</p>
//       </div>
//     </div>
//   );

export const FolderCard = ({ name, fileCount, folderID }) =>{


  const navigate = useNavigate();

  return   (

    <div className="relative w-52 h-40 cursor-pointer" onClick={()=>navigate(`/memo?folder=${folderID}`)}>
      {/* Folder shape */}
      <svg
        viewBox="0 0 200 120"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute w-full h-full"
      >
        {/* Folder body */}
        {/* <path
          d="M10 40 Q15 10 50 10 L90 10 Q105 10 110 20 L190 20 Q195 20 195 25 L195 100 Q195 110 185 110 L15 110 Q5 110 5 100 L5 50 Q5 40 10 40 Z"
          fill="#4299e1"
        /> */}
          <path
                d="M10 40 Q15 10 50 10 L90 10 Q105 10 110 20 L190 20 Q195 20 195 25 L195 120 Q195 130 185 130 L15 130 Q5 130 5 120 L5 50 Q5 40 10 40 Z"
                fill="#4299e1"
            />
        {/* Folder tab */}
        <path
          d="M10 40 Q15 10 50 10 L90 10 Q105 10 115 20 L190 20 Q195 20 195 25 L195 35 Q195 40 190 40 L10 40 Z"
          fill="#63b3ed"
        />
      </svg>
  
      {/* Folder content */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-6">
        {/* Icon */}
        <div className="flex items-center justify-center w-10 h-10  bg-white/20 rounded-full mb-2">
          <CiFolderOn className="w-5 h-5 text-white" />
        </div>
        {/* Folder info */}
        <h3 className="text-md font-semibold text-white truncate">{name}</h3>
        <p className="text-sm text-gray-200">{fileCount} files</p>
      </div>
    </div>
  );
} 


const ScrollableFolders = () => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const {userData} = useCurrentUser()
  const {data} =  useListFolder({
    staff_id:userData?.data?.STAFF_ID
  })
  const {data: status_value} =  useListFolderStatus({
    staff_id:userData?.data?.STAFF_ID
  })

//   console.log(data, status_value)



  const scroll = (direction) => {
    if (scrollRef.current) {
      const amount = direction * 200;
      scrollRef.current.scrollBy({
        left: amount,
        behavior: 'smooth'
      });
    }
  };



  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1); // -1 for rounding errors
    }
  };


  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      // Initial check
      checkScroll();

      // Set up observers for first and last items
      const options = {
        root: scrollContainer,
        threshold: 1.0,
      };

      const observer = new IntersectionObserver(() => {
        checkScroll();
      }, options);

      // Observe all folder items
      scrollContainer.querySelectorAll('.folder-item').forEach(item => {
        observer.observe(item);
      });

      // Clean up
      return () => observer.disconnect();
    }
  }, []);



  
//   const scrollLeft = () => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
//     }
//   };
  
//   const scrollRight = () => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
//     }
//   };
  
  // Sample folder data
  const folders = [
    { name: "General", fileCount: 45 },
    { name: "Images", fileCount: 128 },
    { name: "Projects", fileCount: 23 },
    { name: "Downloads", fileCount: 67 },
    { name: "Music", fileCount: 256 },
    { name: "Videos", fileCount: 89 },
    { name: "Work", fileCount: 34 },
    { name: "Personal", fileCount: 78 }
  ];

  return (
    <div className="relative max-w-full mx-auto">
      {/* Scroll buttons */}
      {canScrollLeft && (
        <button 
          onClick={() => scroll(-1)}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-opacity"
          aria-label="Scroll left"
        >
          <FaChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
      )}
      
      {/* Right scroll button */}
      {canScrollRight && (
        <button 
          onClick={() => scroll(1)}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-opacity"
          aria-label="Scroll right"
        >
          <FaChevronRight className="w-6 h-6 text-gray-600" />
        </button>
      )}
      
      {/* Scrollable container */}
      <div
        ref={scrollRef}
        className="overflow-x-auto scrollbar-hide pb-4 px-8 flex gap-4 snap-x"
        onScroll={checkScroll}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {status_value?.map((folder) => (
          <div key={folder?.ID} className="snap-start">
            <FolderCard name={folder.NAME} folderID={folder?.ID} fileCount={folder?.MEMO_COUNT} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollableFolders;