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
    name: "Anto",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [ShowAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleShowAddFriend() {
    setShowAddFriend((Show) => !Show);
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
  }

  function handleSelection(friend) {
    // setSelectedFriend(friend);
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    handleShowAddFriend(false);
  }

  function handleSplitBill(value) {
    console.log(value);

    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? {
              ...friend,
              balance: friend.balance + value,
            }
          : friend,
      ),
    );
  }

  return (
    <div className="app flex gap-4 w">
      <div className="sidebar w-1/2 bg-amber-200 rounded-md ">
        <FriendList
          friends={friends}
          onSelection={handleSelection}
          selectedFriend={selectedFriend}
        />
        {ShowAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <div className="flex justify-end m-4">
          <Button onClick={handleShowAddFriend}>
            {ShowAddFriend ? "Close" : "Add Friend"}{" "}
          </Button>
        </div>
      </div>
      {selectedFriend && (
        <div className="w-1/2">
          <FormSplitBill
            selectedFriend={selectedFriend}
            onSplitBill={handleSplitBill}
          />
        </div>
      )}
    </div>
  );
}

function FriendList({ friends, onSelection, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          selectedFriend={selectedFriend}
          onSelection={onSelection}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, onSelection, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;

  return (
    <li className="rounded-md">
      <div
        className={`flex justify-between p-2 ${isSelected ? "bg-amber-300" : ""} `}
      >
        <div className="text-left flex items-center">
          <img
            src={friend.image}
            alt={friend.name}
            className="rounded-full mr-4"
          />{" "}
          <div className="flex-col">
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
        <Button onClick={() => onSelection(friend)}>
          {isSelected ? "Close" : "Select"}
        </Button>
      </div>
    </li>
  );
}

function Button({ children, className, onClick }) {
  return (
    <button
      className={`w-16 y-2 rounded-md bg-amber-400 hover:bg-amber-500 ${className}`}
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

function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  function handleSubmit(e) {
    e.preventDefault();

    if (!bill || !paidByUser) return;

    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
  }

  return (
    <div className="w-full">
      <form
        className="bg-amber-200 rounded-md space-y-4"
        onSubmit={handleSubmit}
      >
        <h1 className="text-xl py-4 font-semibold text-center uppercase">
          SPLIT A BILL WITH {selectedFriend.name}
        </h1>

        <div className="flex items-center justify-start mx-4">
          <label className="flex-grow">Bill value</label>
          <input
            className="p-2 w-1/2 rounded-md"
            type="text"
            value={bill}
            onChange={(e) => setBill(Number(e.target.value))}
          />
        </div>
        <div className="flex items-center justify-start mx-4">
          <label className="flex-grow">Your expense</label>
          <input
            type="text"
            className="p-2 w-1/2 rounded-md"
            value={paidByUser}
            onChange={(e) =>
              setPaidByUser(
                Number(e.target.value) > bill
                  ? paidByUser
                  : Number(e.target.value),
              )
            }
          />
        </div>
        <div className="flex items-center justify-start mx-4">
          <label className="flex-grow">{selectedFriend.name}'s expense</label>
          <input
            type="text"
            className="p-2 w-1/2 rounded-md"
            disabled
            value={paidByFriend}
          />
        </div>

        <div className="flex items-center justify-start mx-4">
          <label className="flex-grow">Whos's paying the bill</label>
          <select
            className="px-4 py-2 rounded-md"
            value={whoIsPaying}
            onChange={(e) => setWhoIsPaying(e.target.value)}
          >
            <option value="user">You</option>
            <option value="friend">{selectedFriend.name}</option>
          </select>
        </div>

        <div className="flex justify-end">
          <Button className="m-4">Split Bill </Button>
        </div>
      </form>
    </div>
  );
}
