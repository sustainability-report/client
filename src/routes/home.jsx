import { useEffect, useState } from 'react';
import axios from 'axios';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';

export default function Home() {
  const API_URL = import.meta.env.VITE_REACT_APP_SERVER_URL;
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/files`);
        const filesData = response.data.map(file => ({
          uri: file.file,
          fileName: file.nameOfFile,
          fileType: "pdf"
        }));
        console.log(filesData); // Debug: Log the mapped documents
        setDocuments(filesData);
      } catch (error) {
        console.error("Error fetching files", error);
      }
    };
  
    fetchFiles();
  }, []);
  

  return (
    <div className="file-page-container">
      <DocViewer
        documents={documents}
        pluginRenderers={DocViewerRenderers}
      />
    </div>
  );
}
