import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSession } from '@clerk/clerk-react';
import ConvertApi from 'convertapi-js';


export default function UploadFile() {
  const API_URL = import.meta.env.VITE_REACT_APP_SERVER_URL;
  const navigate = useNavigate();
  const { session } = useSession();
  const [nameOfFile, setNameOfFile] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const postNewFile = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please upload a file");
      return;
    }

    const convertApiKey = import.meta.env.VITE_CONVERT_API_KEY_SECRET
    const convertApi = ConvertApi.auth(`${convertApiKey}`);

    try {
      let params = convertApi.createParams();
      params.add('File', file);

      const result = await convertApi.convert('doc', 'pdf', params);
      const convertedFileUrl = result.files[0].Url;

      // Download the converted PDF file
      const response = await axios.get(convertedFileUrl, { responseType: 'blob' });
      const convertedFile = new Blob([response.data], { type: 'application/pdf' });

      // Upload the converted PDF to your server
      const uploadFormData = new FormData();
      uploadFormData.append('file', convertedFile, `${nameOfFile}.pdf`);
      uploadFormData.append('nameOfFile', nameOfFile);

      const token = await session.getToken();

      await axios.post(`${API_URL}/api/files`, uploadFormData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      alert("Success: Uploaded the PDF file");
      navigate("/");
    } catch (error) {
      console.error("Error during file conversion or upload", error);
      setMessage("Failed to upload file. Please try again.");
    }
  };

  return (
    <div>
      <form onSubmit={postNewFile}>
        <label>Name of File:</label>
        <input
          type="text"
          name="nameOfFile"
          value={nameOfFile}
          onChange={e => setNameOfFile(e.target.value)}
        />

        <input type="file" onChange={handleFileChange} />

        <button type="submit">Submit</button>
      </form>

      <h3>{message}</h3>
    </div>
  );
}
