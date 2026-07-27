import { useState } from 'react'
import Navbar from './components/Navbar';
import Manager from './components/Manager';
import Footer from './components/Footer';


import './App.css'

function App() {
  const [count, setCount] = useState(0)

  
  return (
     <>
    
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size[14px_24px]">
  <Navbar />

  <main className="flex-1 w-full">
    <Manager />
  </main>

  <Footer />
</div>
    </>
    
  );
}
export default App
