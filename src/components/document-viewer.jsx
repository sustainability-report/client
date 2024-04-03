import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';

export default function DocumentViewer() {
  const { id } = useParams();
  const [document, setDocument] = useState(null);
  const API_URL = import.meta.env.VITE_REACT_APP_SERVER_URL;

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/files/${id}`);
        const fileData = {
          uri: response.data.file,
          fileName: response.data.nameOfFile,
          fileType: "pdf", // Assuming PDF, adjust as necessary or dynamically based on response
          // Add more details as needed
        };
        setDocument(fileData);
      } catch (error) {
        console.error("Error fetching document details", error);
      }
    };
    fetchDocument(); 
  }, [id, API_URL]);

  if (!document) {
    return <div>Loading...</div>;
  }
  
  return (
    <div>
      <DocViewer
        documents={[document]}
        pluginRenderers={DocViewerRenderers}
      />
    </div>
  );
}
