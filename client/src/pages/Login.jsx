import { useState } from "react";
import { useNavigate } from "react-router-dom";


import LightPillar from "../components/LightPillar";
import { loginUser } from "../services/auth.service";

import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import { googleLogin } from "../services/auth.service";


export default function Login() {
  const [role, setRole] = useState("customer");
  const [error,setError]=useState("")
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const navigate= useNavigate();
  const [incorrectPass, setIncorrectPass]=useState(false)
  
const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    const res = await googleLogin({
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
    });

    localStorage.setItem("user", JSON.stringify(res.user));

    if (!res.user.isProfileComplete) {
  navigate("/complete-profile");
} else {
  navigate("/customer-dashboard");
}

  } catch (error) {
    console.log(error);
    alert("Google login failed");
  }
};


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
    navigate("/customer-dashboard");
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
          topColor="#90E0EF"
          bottomColor="#0077B6"
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
        <div className="w-full max-w-md bg-[#CAF0F8] border border-[#90E0EF] p-6 md:p-8 rounded-2xl shadow-2xl">

          <div className="rounded-2xl border border-[#90E0EF] bg-white/80 p-5 mb-6 flex flex-col items-center">
            <h2 className="text-sm uppercase tracking-wide font-semibold text-[#0077B6]">
              Welcome Back
            </h2>
            <img src="/newLogo.jpeg" className="h-32 w-auto mt-2 rounded-xl border border-[#90E0EF]" />
          </div>

       
          <div className="flex justify-center items-center flex-col mb-5">
            <h2 className="text-2xl font-bold text-center text-[#03045E]">
              Login to
            </h2>
          </div>

        
          <div className="flex gap-4 mb-4">
            {["customer", "admin"].map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`flex-1 py-2 rounded-lg border transition ${
                  role === r
                    ? "text-white"
                    : "bg-white/70 text-[#03045E]"
                }`}
                style={role === r ? { backgroundColor: "#0077B6" } : null}
              >
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </button>
            ))}
          </div>

       
          <form className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border border-[#90E0EF] rounded-xl text-[#03045E] bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
              name="email"
              onChange={(e)=>setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border border-[#90E0EF] rounded-xl text-[#03045E] bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
               name="password"
              onChange={(e)=>setPassword(e.target.value)}
            />
          
{incorrectPass && (<p className="text-[#03045E] text-center">Incorrect Credentials !</p>)}

            <button
              className="w-full text-white py-3 rounded-xl font-semibold hover:bg-[#00B4D8] transition-colors"
              style={{ backgroundColor: "#0077B6" }}
              onClick={handleSubmit}
            >
              Login as {role}
            </button>
          </form>
          <button
  onClick={handleGoogleLogin}
  className="w-full mt-4 border border-[#90E0EF] bg-white/70 flex items-center justify-center gap-3 py-3 rounded-xl hover:bg-white hover:cursor-pointer transition-colors"
>
  <img src="/google-logo.png" className="h-5" />
  Continue with Google
</button>


          <p className="text-sm text-center mt-4">
            Don’t have an account?{" "}
            <a href="/signup" className="text-[#0077B6] font-medium">
              Sign up
            </a>
          </p>
        </div>
      </div>

    </div>
    </>
  );
}
