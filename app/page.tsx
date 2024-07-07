import getCurrentUser from "./actions/getCurrentUser";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import useRegisterModal from "./hooks/useRegisterModal";
import useLoginModal from "./hooks/useLoginModal";
import { useCallback } from "react";
import { AiOutlineLogin, AiOutlineUserAdd } from "react-icons/ai";

export const dynamic = "force-dynamic";

const Home = async () => {
  const currentUser = await getCurrentUser();
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
      <Container>
        <div className="pt-24 text-center">
          <h1 className="text-4xl font-bold mb-8">Welcome to FindYour.Casa</h1>
          <p className="text-lg mb-8">
            FindYour.Casa is your centralized platform for uploading, analyzing,
            and comparing properties. Whether you're considering multiple homes
            or just want to keep track of potential purchases, FindYour.Casa
            offers the tools you need to make informed decisions.
          </p>
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
              properties you're interested in to your profile. Include details
              like images, descriptions, locations, and prices.
            </li>
            <li className="mb-4">
              <span className="font-semibold">Analyze and Compare:</span> Use
              our tools to analyze and compare the properties you’ve uploaded.
              Make the best decision with all the information at your
              fingertips.
            </li>
          </ol>
          <p className="text-lg mb-8">
            Ready to get started? Sign up now and start uploading your
            properties!
          </p>
          <div className="flex justify-center gap-4">
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
        </div>
      </Container>
    </ClientOnly>
  );
};

export default Home;
