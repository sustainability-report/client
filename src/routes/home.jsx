import { useEffect, useState } from 'react';
import axios from 'axios';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';

export default function Home() {
  const API_URL = import.meta.env.VITE_REACT_APP_SERVER_URL;
  const [documents, setDocuments] = useState([]);
  const [activeDocumentIndex, setActiveDocumentIndex] = useState(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/files`);
        const filesData = response.data.map(file => ({
          uri: file.file,
          fileName: file.nameOfFile,
          fileType: "pdf",
          owner: file.ownerDetails.firstName,
          image: file.ownerDetails.image
        }));
        console.log(filesData)
        setDocuments(filesData);
      } catch (error) {
        console.error("Error fetching files", error);
      }
    };
  
    fetchFiles();
  }, []);

  const handleDocumentClick = (index) => {
    setActiveDocumentIndex(index);
  };

  return (
    <div className="file-page-container">
      <div className="document-list">
        {documents.map((document, index) => (
          <div key={index} className="document-item" onClick={() => handleDocumentClick(index)} style={{cursor:'pointer'}}>
            {document.fileName}
            {document.owner}
            <img src={document.image}/>
          </div>
        ))}
      </div>
      {activeDocumentIndex !== null && (
        <DocViewer
          key={documents[activeDocumentIndex].uri}
          documents={[documents[activeDocumentIndex]]}
          pluginRenderers={DocViewerRenderers}
        />
      )}
    </div>
  );
}