import { useSession } from "@clerk/clerk-react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UploadFile() {
  const API_URL = import.meta.env.VITE_REACT_APP_SERVER_URL;
  const navigate = useNavigate()
  const { session } = useSession();
  const [nameOfFile, setNameOfFile] = useState("")
  const [file, setFile] = useState("");
  const [message, setMessage] = useState("");
  
  const handleFileChange= (e) => {
    const selectedFile = e.target.files[0];
    if(selectedFile) {
      setFile(selectedFile)
    }
  };
  
  const postNewFile = async (e) => {
    e.preventDefault();
    try {
      if(!file) setMessage("Please upload a file")
      const token = await session.getToken();
    console.log(token)
      const uploadFile = new FormData();
      uploadFile.append("file", file);
      uploadFile.append("nameOfFile", nameOfFile)
      await axios.post(`${API_URL}/api/files`, uploadFile, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        }})
      alert("success upload the file")
      navigate("/")
      setFile("")
      setNameOfFile("");
    } catch (e) {
      console.log("error postning new file", e)
    }
  }

  return(
    <div>
      <form onSubmit={postNewFile}>
        <label>Name of File</label>
        <input 
          type="text"
          name="nameOfFile"
          value={nameOfFile}
          onChange={e => setNameOfFile(e.target.value)}
        />

        <input type="file" onChange={handleFileChange}/>

        <button type="submit">Submit</button>
      </form>
      
      <h3>{message}</h3>
    </div>
  );
  
}