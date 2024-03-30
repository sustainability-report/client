import { Link } from "react-router-dom";
 
export default function About() {
  
  return (
    <>
      <h1>About</h1>
      <p>This is a public page meant to contain an about content.</p>
      <ul>
        <li><Link to="/">Return Home</Link></li>
      </ul>
    </>
  );
}