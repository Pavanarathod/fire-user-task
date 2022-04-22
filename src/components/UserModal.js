import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { disableModal } from "../features/userModalSlice";
import { collection, addDoc } from "firebase/firestore";
import { database } from "../db/firebase";

export default function UserModal() {
  const nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const { showModal } = useSelector((state) => state.userModel);
  const dispatch = useDispatch();
  console.log(showModal);

  function closeModal() {
    dispatch(disableModal());
  }

  const createUser = async (e) => {
    e.preventDefault();

    const docRef = await addDoc(collection(database, "customUsers"), {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
    if (docRef) {
      alert("Created new user");
    } else {
      console.log("user not created");
    }
  };

  return (
    <>
      <Transition appear show={showModal} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-[#08393B6E]" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-lg p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <div className="flex flex-col space-y-9">
                  <h1 className="text-xl font-semibold text-gray-900">
                    Add User
                  </h1>
                  <form className="flex flex-col space-y-6">
                    <div className="grid grid-cols-2 gap-5">
                      <input
                        ref={nameRef}
                        placeholder="Name"
                        type="test"
                        className="signup__input"
                      />
                      <input
                        ref={emailRef}
                        placeholder="Email"
                        type="text"
                        className="signup__input"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                      <input
                        ref={passwordRef}
                        placeholder="password"
                        type="password"
                        className="signup__input"
                      />
                      <input
                        placeholder="Confirm password"
                        type="password"
                        className="signup__input"
                      />
                    </div>

                    <div>
                      <button
                        onClick={createUser}
                        className="px-16 py-3 bg-orange-400 text-white"
                      >
                        Add User
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
