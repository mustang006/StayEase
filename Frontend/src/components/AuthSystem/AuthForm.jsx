import React from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth, db } from './config/firebaseConfig'; // ✅ Include db
import { setDoc, doc } from 'firebase/firestore'; // ✅ Firestore write
import toast, { Toaster } from 'react-hot-toast';
import FormInput from './FormInput';
import SocialButton from './SocialButton';

const AuthForm = ({ type, setFormType }) => {
  const isLogin = type === 'login';
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const { name, email, password } = data;

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success('Logged in successfully');
        navigate('/');
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        // ✅ Update Firebase Auth profile
        await updateProfile(userCredential.user, {
          displayName: name,
        });

        // ✅ Save user to Firestore with role
        await setDoc(doc(db, 'users', email), {
          name,
          role: email === 'itsmeabhishek65@gmail.com' ? 'admin' : 'user',
        });

        toast.success('Account created successfully');
        navigate('/');
      }

      reset();
    } catch (error) {
      toast.error(error.message || 'Something went wrong');
    }
  };

  return (
    <motion.div
      key={type}
      initial={{ x: isLogin ? '-100%' : '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: isLogin ? '100%' : '-100%', opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="w-full absolute"
    >
      <Toaster position="top-right" />
      <form onSubmit={handleSubmit(onSubmit)}>
        {!isLogin && (
          <FormInput
            id="name"
            type="text"
            placeholder="Name"
            {...register('name', { required: 'Name is required' })}
          />
        )}

        <FormInput
          id="email"
          type="email"
          placeholder="Email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Invalid email format',
            },
          })}
        />
        {errors.email && (
          <p className="text-sm text-red-400 mb-2">{errors.email.message}</p>
        )}

        <FormInput
          id="password"
          type="password"
          placeholder="Password"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          })}
        />
        {errors.password && (
          <p className="text-sm text-red-400 mb-4">
            {errors.password.message}
          </p>
        )}

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 text-lg font-bold text-white bg-[#5A80E9]/90 rounded-lg border-2 border-transparent hover:border-[#A8C5FF] hover:animate-pulse transition-all duration-300 shadow-[0_0_20px_rgba(90,128,233,0.4)]"
        >
          {isLogin ? 'Login' : 'Sign Up'}
        </motion.button>

        <div className="flex items-center gap-4 my-6">
          <hr className="flex-grow border-t border-[#5A80E9]/20" />
          <span className="text-[#C5C8D7]">Or continue with</span>
          <hr className="flex-grow border-t border-[#5A80E9]/20" />
        </div>

        <div className="flex items-center gap-4">
          <SocialButton>Google</SocialButton>
          <SocialButton>Apple</SocialButton>
        </div>

        <div className="text-center mt-6 text-sm">
          <p className="text-[#C5C8D7]">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              type="button"
              onClick={() => setFormType(isLogin ? 'signup' : 'login')}
              className="font-semibold text-[#A8C5FF] hover:text-white transition-colors"
            >
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </div>
      </form>
    </motion.div>
  );
};

export default AuthForm;
