import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'

// Global style for dark background
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background-color: #0e0e0e;
    color: white;
    font-family: 'Courier New', Courier, monospace;
    overflow: hidden;
  }
`

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
`

const Title = styled.pre`
  color: #00ffe0;
  font-size: 0.75rem;
  text-align: center;
  margin-bottom: 2rem;
  white-space: pre;
  text-shadow: 0 0 5px #00ffe0, 0 0 10px #00ffe0;
`

const Error = styled.pre`
  color:rgb(202, 40, 40);
  font-size: 1rem;
  text-align: center;
  margin-bottom: 2rem;
  white-space: pre;
  text-shadow: 0 0 5px rgb(0, 0, 0), 0 0 10px rgb(0, 0, 0);
  border: 1px dotted rgb(202, 40, 40);
  padding : 5px;
`

const Input = styled.input`
  padding: 15px;
  font-size: 1.2rem;
  border-radius: 15px;
  border: none;
  width: 320px;
  background: linear-gradient(135deg, rgba(255,255,255,0.2), rgba(200,200,200,0.1));
  backdrop-filter: blur(5px);
  color: #fff;
  margin-bottom: 1rem;
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
  transition: all 0.3s;
  &:hover {
    background: linear-gradient(45deg, #f0f0f0, #c0c0c0);
  }
`

let particleCount = Math.floor(Math.random() * 100) * 10;

function SpiderWebCanvas() {
  const canvasRef = useRef()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    let particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width + Math.random()*0.1,
      y: Math.random() * height + Math.random()*0.1,
      vx: Math.random() * 0.5 - 0.25,
      vy: Math.random() * 0.5 - 0.25,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      for (let i = 0; i < particles.length; i++) {
        let p = particles[i]
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2)
        ctx.fillStyle = '#00ffe0'
        ctx.fill()
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          let dx = particles[i].x - particles[j].x
          let dy = particles[i].y - particles[j].y
          let dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = 'rgba(0, 255, 224, 0.2)'
            ctx.stroke()
          }
        }
      }

      requestAnimationFrame(draw)
    }

    draw()
    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    })
  }, [])

  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: 0 }} />
}

function LandingPage() {
  const [slug, setSlug] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [filesCount, setFilesCount] = useState(null)
  const navigate = useNavigate()
  const inputRef = useRef()
  
  useEffect(() => {

    fetchFileCount()
    inputRef.current?.focus()
  }, [])
  
  const fetchFileCount = async () => {
    try {
      const response = await fetch('http://vaibhavp.hyderabad.cdac.in:8080/filescount/', {
        method: 'GET',
      });
  
      if (!response.ok) {
        console.error('Failed to fetch file count. Status:', response.status);
        setFilesCount(null);
        return;
      }
  
      const data = await response.json();
      setFilesCount(data.filecount);

    } catch (error) {
      console.error('Error fetching file count:', error);
      setFilesCount(null);
    }
  };
  
  const handleGet = async () => {
    try {
      const response = await fetch('http://vaibhavp.hyderabad.cdac.in:8080/create-endpoint/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ slug }),
      })

      if (response.ok) {
        navigate(`${slug}`)
      } else if(response) {
        const data = await response.json();
        // alert(`Error: ${data.error}`)
        setErrorMessage(data.error)
      }
       else {
        alert('Slug is Invalid')
      }
    } catch (error) {
      console.error(error)
      alert('Server error. Please try again.')
    }
  }

  return (
    <>
      <GlobalStyle />
      <SpiderWebCanvas />
      <Container>
        
        <Title>Total Files Uploaded: {filesCount}</Title>
        <Title>{`
██╗    ██╗███████╗██████╗ ███████╗██╗  ██╗ █████╗ ██████╗ ███████╗
██║    ██║██╔════╝██╔══██╗██╔════╝██║  ██║██╔══██╗██╔══██╗██╔════╝
██║ █╗ ██║█████╗  ██████╔╝███████╗███████║███████║██████╔╝█████╗  
██║███╗██║██╔══╝  ██╔══██╗╚════██║██╔══██║██╔══██║██╔══██╗██╔══╝  
╚███╔███╔╝███████╗██████╔╝███████║██║  ██║██║  ██║██║  ██║███████╗
 ╚══╝╚══╝ ╚══════╝╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝
        `}</Title>
        <Input
          ref={inputRef}
          type="text"
          placeholder="Enter the slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />
        {errorMessage && <Error>{errorMessage}</Error>}
        <Button onClick={handleGet}>Get</Button>
      </Container>
    </>
  )
}

export default LandingPage
