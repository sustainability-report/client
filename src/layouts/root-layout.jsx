import { Link, Outlet, useNavigate } from 'react-router-dom'
import { ClerkProvider, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'
import { FaHome } from "react-icons/fa";
import { PiSignInBold } from "react-icons/pi";
import { useState } from 'react';
import { MdScreenShare } from "react-icons/md";
import { GiClassicalKnowledge } from "react-icons/gi";
import { GiHamburgerMenu } from "react-icons/gi";


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
 
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

export default function RootLayout() {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("")
  const [hideHeader, setHideHeader] = useState(false)

  const handleActiveLink = (linkPath) => {
    setActiveLink(linkPath)
  }

  const handleHideHeader = () => {
    setHideHeader(!hideHeader)
  }
    
  const xClass = `x ${hideHeader ? 'x-hidden' : ''}`;
  const mainClass = `${hideHeader ? 'main-hidden' : ''}`;
  
  return (
    <ClerkProvider navigate={navigate} publishableKey={PUBLISHABLE_KEY}>
      <header className={`side-header ${hideHeader ? 'hidden' : ''}` }>
        <p>SHARE-K</p>
        <hr />          
        <ul>
          <li>
            <Link to="/" onClick={() => handleActiveLink("/")} className={activeLink === "/" ? "active" : ""}><FaHome/><span>Home</span></Link>
          </li> 
          <li>
            <Link to="/about" onClick={() => handleActiveLink("/about")} className={activeLink === "/about" ? "active" : ""}><GiClassicalKnowledge/><span>About</span></Link>
          </li>
          <SignedIn>
            <li>
              <Link to="/upload" onClick={() => handleActiveLink("/upload")} className={activeLink === "/upload" ? "active" : ""}><MdScreenShare/><span>Upload Knowledge</span></Link>
            </li>
          </SignedIn>
          <SignedOut>
            <li>
              <Link to="/sign-in" onClick={() => handleActiveLink("/sign-in")} className={activeLink === "/sign-in" ? "active" : ""}><PiSignInBold/><span>Sign In</span></Link>
            </li>
          </SignedOut>
        </ul>

        <ul className='account-button'>
          <li>
            <SignedIn>
              <span/>
              <UserButton afterSignOutUrl='/'/>
            </SignedIn>
          </li>
        </ul>
      </header>

      <div className={xClass}>
        <span onClick={handleHideHeader}><GiHamburgerMenu/></span>
        <h1>Knowledge is a fundamental thing for human being!</h1>
      </div>

      <main className={mainClass}>
        <Outlet />
      </main>
      
    </ClerkProvider>
  )
}