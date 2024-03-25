import { Link, Outlet, useNavigate } from 'react-router-dom'
import { ClerkProvider, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'
import { FaHome } from "react-icons/fa";
import { MdContactPhone } from "react-icons/md";
import { FaFileSignature } from "react-icons/fa6";
import { PiSignInBold } from "react-icons/pi";
import { useState } from 'react';


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
 
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

export default function RootLayout() {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("")

  const handleActiveLink = (linkPath) => {
    setActiveLink(linkPath)
  }
  
  return (
    <ClerkProvider navigate={navigate} publishableKey={PUBLISHABLE_KEY}>
      
      <header className="side-header">
        <p>NEW-STAGE</p>
        <hr />          
        <ul>
          <li>
            <Link to="/" onClick={() => handleActiveLink("/")} className={activeLink === "/" ? "active" : ""}><FaHome/><span>Dashboard</span></Link>
          </li> 
          <li>
            <Link to="/contact" onClick={() => handleActiveLink("/contact")} className={activeLink === "/contact" ? "active" : ""}><MdContactPhone/><span>Contact</span></Link>
          </li>
          <SignedIn>
            <li>
              <Link to="/files" onClick={() => handleActiveLink("/upload-file")} className={activeLink === "/upload-file" ? "active" : ""}><FaFileSignature/><span>Files</span></Link>
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

      <main>
        <Outlet />
      </main>
      
    </ClerkProvider>
  )
}