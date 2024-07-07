"use client";

import { useCallback } from "react";
import { AiOutlineLogin, AiOutlineUserAdd } from "react-icons/ai";
import ClientOnly from "./components/ClientOnly";
import useRegisterModal from "./hooks/useRegisterModal";
import useLoginModal from "./hooks/useLoginModal";

const Home = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const onRegister = useCallback(() => {
    registerModal.onOpen();
  }, [registerModal]);

  const onLogin = useCallback(() => {
    loginModal.onOpen();
  }, [loginModal]);

  return (
    <ClientOnly>
      <div
        className="relative bg-cover bg-center min-h-screen flex items-center justify-center"
        style={{ backgroundImage: 'url("/images/provence.jpg")', zIndex: '-1' }}
      >
        <div className="bg-white bg-opacity-80 p-10 rounded-md shadow-md max-w-2xl mx-auto text-center mt-20" style={{ zIndex: '1' }}>
          <h1 className="text-4xl font-bold mb-8">The First Step to Finding your Dream Property</h1>
          <p className="text-lg mb-8">
            FindYour.Casa is your centralized platform for uploading, analyzing,
            and comparing properties. Whether you&apos;re considering multiple regions
            or just want to keep track of your properties, FindYour.Casa
            offers the tools you need to make informed decisions.
          </p>
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={onLogin}
              className="
                flex
                items-center
                px-4
                py-2
                text-white
                bg-blue-500
                rounded-full
                hover:bg-blue-600
                transition
                shadow-md
                hover:shadow-lg
              "
            >
              <AiOutlineLogin className="mr-2" />
              Login
            </button>
            <button
              onClick={onRegister}
              className="
                flex
                items-center
                px-4
                py-2
                text-white
                bg-green-500
                rounded-full
                hover:bg-green-600
                transition
                shadow-md
                hover:shadow-lg
              "
            >
              <AiOutlineUserAdd className="mr-2" />
              Sign Up
            </button>
          </div>
          <h2 className="text-2xl font-semibold mb-4">
            Get Started in Three Easy Steps:
          </h2>
          <ol className="list-decimal list-inside mb-8 text-lg">
            <li className="mb-4">
              <span className="font-semibold">Sign Up:</span> Create an account
              to get started. You can sign up with your email, Google, or GitHub
              account.
            </li>
            <li className="mb-4">
              <span className="font-semibold">Upload Properties:</span> Add the
              properties you&apos;re interested in or own to your profile. Include details
              like images, descriptions, locations, prices, with extensive notes section for keeping track of special agreements and more.
            </li>
            <li className="mb-4">
              <span className="font-semibold">Analyze and Compare:</span> Use
              our tools to analyze and compare the properties you&apos;ve uploaded.
              Make the best decision with all the information at your
              fingertips.
            </li>
          </ol>
          <p className="text-lg mb-8">
            Ready to get started? Sign up now and start uploading your
            properties!
          </p>
        </div>
      </div>
    </ClientOnly>
  );
};

export default Home;
