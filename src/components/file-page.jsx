import axios from "axios";
import { useEffect } from "react";
import { useState } from "react"
import { Link } from "react-router-dom";

export default function FilesPage() {
  const API_URL = import.meta.env.VITE_REACT_APP_SERVER_URL;
  const [files, setFiles] = useState([]);
  

  useEffect(() => {
     const fetchingFiles = async () => {
       try {
        const listOfFiles = await axios.get(`${API_URL}/api/files`)
        setFiles(listOfFiles.data)
      } catch (e) {
        console.log("error fetching files", e)
      }
     }
  
     fetchingFiles();
  }, [])

  return(
    <div>
      <h1>This is file page</h1>
      <Link to="/upload-file">Upload File</Link>
      {files.map(element => (
        <div key={element._id}>
          <p>{element.nameOfFile}</p>
          <img src={element.file} alt="file-img"/>
        </div>
      ))}
    </div>
  )
}