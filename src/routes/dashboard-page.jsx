import { useAuth } from "@clerk/clerk-react"

export default function DashboardPage() {
  const {userId, isSignedIn} = useAuth()
  console.log(userId, isSignedIn)
  
  return (
    <div>
      <h1>This is the index page</h1>
    </div>
  )
}