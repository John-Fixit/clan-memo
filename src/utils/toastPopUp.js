import toast from "react-hot-toast"

export const errorToast=(errMsg)=>{
    toast.error(errMsg, {
        style: {
          background: 'red',
          fontSize: "13px",
          color: '#fff',
          border: '2px solid #fff',
        },
        position: 'top-right',
        duration: 1000,
        closeButton: true,
      })
}
export const successToast=(successMsg)=>{
    toast.success(successMsg, {
        style: {
          background: 'green',
          fontSize: "13px",
          color: '#fff',
          border: '2px solid #fff',
        },
        position: 'top-right',
        duration: 1000,
        closeButton: true
      })
}