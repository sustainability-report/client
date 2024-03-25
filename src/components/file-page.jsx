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
  console.log(files)

  return(
    <div className="file-page-container">
      <div className="header">
        <h1>This is file page</h1>
        <button>
          <Link to="/upload-file">Upload File</Link>
        </button>
      </div>

      {files.map(element => (
      <div key={element._id} className="file-container">
        {/* <p>{element.nameOfFile}</p> */}
        <img src={element.file} alt="file-img" className="image-from-file-page"/>
      </div>
      ))}
    </div>
  )
}