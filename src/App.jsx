import "./App.css";
import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [friends, setFriends] = useState(initialFriends);

  const [ShowAddFriend, setShowAddFriend] = useState(false);

  function handleShowAddFriend() {
    setShowAddFriend((Show) => !Show);
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
  }

  return (
    <div className="app flex gap-4 w">
      <div className="sidebar w-1/2 bg-amber-200 rounded-md ">
        <FriendList friends={friends} />
        {ShowAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <div className="flex justify-end m-4">
          <Button onClick={handleShowAddFriend}>
            {ShowAddFriend ? "Close" : "Add Friend"}{" "}
          </Button>
        </div>
      </div>
      <div className="w-1/2">
        <FormSplitBill />
      </div>
    </div>
  );
}

function FriendList({ friends }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} />
      ))}
    </ul>
  );
}

function Friend({ friend }) {
  return (
    <li className="w-full flex items-center justify-between gap-4 mb-4 hover:bg-amber-200 w-[35%] p-4 rounded-md">
      <div className="flex gap-4">
        <img src={friend.image} alt={friend.name} className="rounded-full" />
        <div className="text-left">
          {" "}
          <h3>{friend.name}</h3>
          {friend.balance < 0 && (
            <p className="text-red-800">
              You owe {friend.name} ${Math.abs(friend.balance)}{" "}
            </p>
          )}
          {friend.balance > 0 && (
            <p className="text-green-600">
              {friend.name} owes you ${Math.abs(friend.balance)}{" "}
            </p>
          )}
          {friend.balance === 0 && <p>You and {friend.name} even</p>}
        </div>
      </div>
      <Button>Select</Button>
    </li>
  );
}

function Button({ children, className, onClick }) {
  return (
    <button
      className={`px-4 py-2 rounded-md bg-amber-400 hover:bg-amber-500 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();

    const NewFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };

    onAddFriend(NewFriend);

    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return (
    <div className=" text-left  bg-amber-200 py-6 rounded-md">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-4 mx-4">
          <label className="flex-grow ">Name</label>
          <input
            type="text"
            className="px-4 py-2  focus:outline-none rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>{" "}
        <div className="flex items-center gap-4 mx-4 mt-4">
          <label className=" flex-grow">Image Url</label>
          <input
            type="text"
            className="px-4 py-2 focus:outline-none rounded-md"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div className="flex justify-end mr-4 mt-4">
          <Button>Add</Button>
        </div>
      </form>
    </div>
  );
}

function FormSplitBill() {
  return (
    <div className="w-full">
      <form className="bg-amber-200 rounded-md space-y-4">
        <h1 className="text-xl py-4 font-semibold text-center">
          SPLIT A BILL WITH X
        </h1>

        <div className="flex items-center justify-start mx-4">
          <label className="flex-grow">Bill value</label>
          <input type="text" className="p-2 w-1/2 rounded-md" />
        </div>
        <div className="flex items-center justify-start mx-4">
          <label className="flex-grow">Your expense</label>
          <input type="text" className="p-2 w-1/2 rounded-md" />
        </div>
        <div className="flex items-center justify-start mx-4">
          <label className="flex-grow">X's expense</label>
          <input type="text" className="p-2 w-1/2 rounded-md" disabled />
        </div>

        <div className="flex items-center justify-start mx-4">
          <label className="flex-grow">Whos's paying the bill</label>
          <select name="" id="" className="px-4 py-2 rounded-md">
            <option value="user">You</option>
            <option value="friend">X</option>
          </select>
        </div>

        <div className="flex justify-end">
          <Button className="m-4">Split Bill </Button>
        </div>
      </form>
    </div>
  );
}
