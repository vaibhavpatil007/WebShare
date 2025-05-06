import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'

// Global dark theme
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background-color: #0e0e0e;
    color: white;
    font-family: 'Courier New', Courier, monospace;
  }
`

const Container = styled.div`
  min-height: 100vh;
  padding: 3rem;
  position: relative;
  z-index: 1;
`

const Heading = styled.h1`
  font-size: 2rem;
  color: #00ffe0;
  margin-bottom: 1.5rem;
  text-shadow: 0 0 8px #00ffe0;
`

const UploadArea = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 2rem;
`

const FileInput = styled.input`
  padding: 15px;
  font-size: 1rem;
  border-radius: 15px;
  background: linear-gradient(135deg, rgba(255,255,255,0.2), rgba(200,200,200,0.1));
  backdrop-filter: blur(5px);
  color: white;
  border: none;
  outline: none;
`

const Button = styled.button`
  padding: 12px 24px;
  border-radius: 12px;
  background: linear-gradient(45deg, #ffffff, #d6d6d6);
  color: black;
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: linear-gradient(45deg, #f0f0f0, #c0c0c0);
  }
`

const SectionTitle = styled.h2`
  margin-top: 2rem;
  color: #00ffe0;
  text-shadow: 0 0 6px #00ffe0;
`

const FileTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.2);
`

const TableHeader = styled.th`
  padding: 14px;
  // background: linear-gradient(90deg, #00d4ff, #008cff);
  background: linear-gradient(90deg,rgb(45, 92, 102),rgb(5, 18, 29));
  color: white;
  text-align: left;
  font-weight: bold;
  text-shadow: 0 0 5px #00ffff;
`

const TableRow = styled.tr`
  background-color: rgba(255, 255, 255, 0.03);
  transition: background 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.08);
  }
`

const TableCell = styled.td`
  padding: 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: #e0f7ff;
`
const Footer = styled.footer`
  margin-top: 3rem;
  text-align: center;
  color: #666;
  font-size: 0.9rem;
  padding-top: 2rem;
  border-top: 1px solid #333;
  opacity: 0.7;
`

const FileLink = styled.a`
  color: #84dfff;
  text-decoration: underline;
  word-break: break-word;
`

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: red;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`

const generateUniqueStringFromIP = (ip) => {
  if (!ip) return 'unknown-ip'
  let hash = 0
  for (let i = 0; i < ip.length; i++) {
    hash = ((hash << 5) - hash + ip.charCodeAt(i)) & hash
  }
  return `user-${Math.abs(hash).toString(36)}`
}

function UploadPage() {
  const { slug } = useParams()
  const [file, setFile] = useState(null)
  const [uploadedFiles, setUploadedFiles] = useState([])
  const fileInputRef = useRef()

  const handleUpload = async () => {
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch(`http://vaibhavp.hyderabad.cdac.in:8080/${slug}/`, {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        await fetchFiles()
        setFile(null)
        fileInputRef.current.value = null
      } else {
        alert('Upload failed')
      }
    } catch (err) {
      console.error(err)
      alert('Server error while uploading.')
    }
  }

  const fetchFiles = async () => {
    try {
      const res = await fetch(`http://vaibhavp.hyderabad.cdac.in:8080/${slug}/`)
      const files = await res.json()
      setUploadedFiles(files)
    } catch (err) {
      console.error('Error fetching files', err)
    }
  }

  const handleDelete = async (fileId) => {
    try {
      const response = await fetch(`http://vaibhavp.hyderabad.cdac.in:8080/${slug}/delete/${fileId}/`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setUploadedFiles(uploadedFiles.filter((file) => file.id !== fileId))
      } else {
        alert('Delete failed')
      }
    } catch (err) {
      console.error('Error deleting file', err)
    }
  }

  useEffect(() => {
    fetchFiles()
  }, [slug])

  return (
    <>
      <GlobalStyle />
      <Container>
        <Heading>
          Upload Files for <span style={{ color: '#84dfff' }}>"{slug}"</span>
        </Heading>
        <UploadArea>
          <FileInput
            type="file"
            ref={fileInputRef}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button onClick={handleUpload}>Upload</Button>
        </UploadArea>

        <SectionTitle>Uploaded Files</SectionTitle>
        <FileTable>
          <thead>
            <tr>
              <TableHeader>File Name</TableHeader>
              <TableHeader>Uploaded At</TableHeader>
              <TableHeader>Uploaded By (IP)</TableHeader>
              <TableHeader>Actions</TableHeader>
            </tr>
          </thead>
          <tbody>
            {uploadedFiles.map((f) => (
              <TableRow key={f.id}>
                <TableCell>
                  <FileLink
                    href={`http://vaibhavp.hyderabad.cdac.in:8080${f.file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {f.file.split('/').pop()}
                  </FileLink>
                </TableCell>
                <TableCell>{new Date(f.uploaded_at).toLocaleString()}</TableCell>
                <TableCell>{generateUniqueStringFromIP(f.ip)}</TableCell>
                <TableCell>
                  <DeleteButton onClick={() => handleDelete(f.id)}>
                    Delete
                  </DeleteButton>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </FileTable>
        <Footer>© 2025 Vaibhav Patil </Footer>
      </Container>
    </>
  )
}

export default UploadPage
