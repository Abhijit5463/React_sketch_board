import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";


const ClientRoom = ({ userNo, socket, setUsers, setUserNo }) => {
  const imgRef = useRef(null);
  useEffect(() => {
    socket.on("message", (data) => {
      toast.info(data.message);
    });
  }, []);
  useEffect(() => {
    socket.on("users", (data) => {
      setUsers(data);
      setUserNo(data.length);
    });
  }, []);
  useEffect(() => {
    socket.on("canvasImage", (data) => {
      imgRef.current.src = data;
    });
  }, []);

  const handleDownload = () => {
 
    const link = document.createElement('a');
    link.href =  imgRef.current.src; 
    link.download = 'image.jpg';
    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };
  return (





    <div className="container-fluid">
    
     
      <div className="row pb-2">
        <h1 className="display-5 pt-4 pb-3 text-center">
          React Drawing App - users online:{userNo}
        </h1>
      </div>
      <div className="row mt-5">
        <div
          className="col-md-8 overflow-hidden border border-dark px-0 mx-auto
          mt-3"
          style={{ height: "500px" }}
        >
          <img className="w-100 h-100" ref={imgRef} src="" alt="image" />
        </div>
      </div>
      <button className="d-flex justify-content-center align-items-center" onClick={handleDownload}>
        Download
        </button>

    </div>
    

  );
};

export default ClientRoom;