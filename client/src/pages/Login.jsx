import { useState } from "react";
import { useNavigate } from "react-router-dom";


import LightPillar from "../components/LightPillar";
import { loginUser } from "../services/auth.service";

export default function Login() {
  const [role, setRole] = useState("customer");
  const [error,setError]=useState("")
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const navigate= useNavigate();
  const [incorrectPass, setIncorrectPass]=useState(false)
  

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    console.log('s')
    const res = await loginUser({ email, password });

    // ✅ Remember user
    localStorage.setItem("user", JSON.stringify(res.user));

    if(res.user.role==='admin'){
      navigate("/admin");
    }else{
      
    // redirect
    navigate("/");
    }
  } catch (err) {
    setError(err.response?.data?.message || "Login failed");
   if(err.status===401){
    setIncorrectPass(true)
   }
    console.log(err)
  }
};

  return (<>
       <div className="min-h-screen relative overflow-hidden">

      {/* 🔮 Animated Background */}
      <div className="absolute inset-0 z-0">
        <LightPillar
          topColor="#8fd3b7"
          bottomColor="#467f95"
          intensity={2.0}
          rotationSpeed={0.6}
          glowAmount={0.002}
          pillarWidth={5.0}
          pillarHeight={0.9}
          noiseIntensity={0.5}
          pillarRotation={0}
          interactive={false}
          mixBlendMode="screen"
        />
      </div>

    
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-lg w-full max-w-md">

       
          <div className="flex justify-center items-center flex-col mb-6">
            <h2 className="text-2xl font-bold text-center">
              Login to
            </h2>
            <img src="./logo.png" className="h-70 w-70" />
          </div>

        
          <div className="flex gap-4 mb-4">
            {["customer", "admin"].map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`flex-1 py-2 rounded-lg border transition ${
                  role === r
                    ? "text-white"
                    : "bg-gray-100"
                }`}
                style={role === r ? { backgroundColor: "#467f95" } : null}
              >
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </button>
            ))}
          </div>

       
          <form className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded-lg"
              name="email"
              onChange={(e)=>setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border rounded-lg"
               name="password"
              onChange={(e)=>setPassword(e.target.value)}
            />
          
{incorrectPass && (<p className="text-red-600 text-center">Incorrect Credentials !</p>)}

            <button
              className="w-full text-white py-3 rounded-lg"
              style={{ backgroundColor: "#467f95" }}
              onClick={handleSubmit}
            >
              Login as {role}
            </button>
          </form>

          <p className="text-sm text-center mt-4">
            Don’t have an account?{" "}
            <a href="/signup" className="text-blue-600 font-medium">
              Sign up
            </a>
          </p>
        </div>
      </div>

    </div>
    </>
  );
}
