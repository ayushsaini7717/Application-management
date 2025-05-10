"use client";
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
        callbackUrl: '/candidate'
      });

      if (res?.ok) {
        router.push(res.url || '/candidate');
      } else {
        alert('Login failed');
      }
    } else {
      try {
        const res = await fetch('/api/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (data.success) {
          const loginRes = await signIn('credentials', {
            redirect: false,
            email,
            password,
            callbackUrl: '/candidate'
          });
          if (loginRes?.ok) {
            router.push(loginRes.url || '/candidate');
          }
        } else {
          alert(data.message || 'Sign Up failed');
        }
      } catch (error) {
        console.error(error);
        alert('Sign Up error');
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="md:w-1/2">
        <img
          className="w-full h-[calc(100vh-4rem)] object-cover"
          src="/signupImage.png"
          alt="Authentication Visual"
        />
      </div>
      <div className="flex flex-col justify-center items-center md:w-1/2 p-6">
        <div className="mb-6 text-center">
          <h3 className="text-2xl font-semibold">
            {isLogin ? 'Login To Your Account' : 'Create A New Account'}
          </h3>
          <div className="w-20 mx-auto border-b-2 border-yellow-500 mt-2"></div>
        </div>
        <form className="w-full max-w-sm" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              id="email"
              type="text"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-yellow-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-yellow-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 rounded transition duration-150"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <div className="my-4 text-center">
          <span className="mr-2">or</span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => signIn('google')} className="cursor-pointer">
            <img
              className="w-10 h-10"
              src="/Google-icon.webp"
              alt="Google login"
            />
          </button>
          <button onClick={() => signIn('github')} className="cursor-pointer">
            <img
              className="w-8 h-8"
              src="/Github-icon.webp"
              alt="GitHub login"
            />
          </button>
        </div>
        <div className="mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button onClick={() => setIsLogin(!isLogin)} className="ml-1 text-blue-600 underline">
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
}
