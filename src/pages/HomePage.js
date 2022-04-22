import React, { useEffect, useState } from "react";
import {
  BookmarkIcon,
  BriefcaseIcon,
  CalculatorIcon,
  ChartBarIcon,
  ChatAlt2Icon,
  ShieldCheckIcon,
  UserAddIcon,
  UserIcon,
} from "@heroicons/react/solid";
import { auth, database } from "../db/firebase";
import UserList from "../components/UserList";
import UserModal from "../components/UserModal";
import { useDispatch } from "react-redux";
import { enabledModal } from "../features/userModalSlice";
import { collection, onSnapshot } from "firebase/firestore";

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const user = auth.currentUser;
  console.log(user);
  const dispatch = useDispatch();

  const userData = [
    {
      email: "user@example.com",
      name: "John",
      createdAt: "2015-33-3",
    },
    {
      email: "user@example.com",
      name: "John",
      createdAt: "2015-33-3",
    },
  ];

  function openModal() {
    dispatch(enabledModal());
  }

  useEffect(() => {
    const getUser = async () => {
      await onSnapshot(collection(database, "customUsers"), (snapshot) => {
        setUsers(snapshot.docs.map((doc) => ({ ...doc.data() })));
      });
    };
    getUser();
  }, []);

  console.log(users);
  return (
    <>
      {/* header */}
      <header className="flex sticky top-0 items-center justify-between bg-slate-100 border-b border-gray-300 shadow-lg">
        <ShieldCheckIcon className="bg-indigo-600 h-20 text-white px-5 py-2" />
        <div className="flex  items-center px-5 space-x-10">
          <div className="flex items-center">
            <UserIcon className="h-10 text-indigo-600 px-5 py-2" />
            <p className="font-semibold text-indigo-400">{user?.displayName}</p>
          </div>
          <button
            onClick={() => auth.signOut()}
            className="bg-red-500 text-white focus:outline-none px-3 py-1 rounded-lg text-sm"
          >
            Log out
          </button>
        </div>
      </header>

      {/* BODY */}
      <div className="flex w-full h-screen">
        {/* sid bar */}
        <div className=" bg-indigo-500 w-28">
          <div className="py-6 flex flex-col space-y-3">
            <BriefcaseIcon className="h-16 text-white" />
            <BookmarkIcon className="h-16 text-white" />
            <CalculatorIcon className="h-16 text-white" />
            <ChartBarIcon className="h-16 text-white" />
            <ChatAlt2Icon className="h-16 text-white" />
            <UserAddIcon
              onClick={openModal}
              className="h-16 text-white hover:bg-[#08393B6E] cursor-pointer"
            />
          </div>
        </div>
        <div className=" w-full">
          <h1 className="py-5 px-10">All Users</h1>
          <div className="flex flex-col space-y-5">
            {userData.map((user, index) => (
              <UserList
                key={index}
                index={index + 1}
                email={user.email}
                name={user.name}
                timestamp={user.createdAt}
              />
            ))}
          </div>
        </div>
      </div>

      <UserModal />
    </>
  );
};

export default HomePage;
