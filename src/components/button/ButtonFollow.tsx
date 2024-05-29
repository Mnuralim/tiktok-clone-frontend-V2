"use client";
import { followUser } from "@/utils/fetch";
import React, { useEffect, useState } from "react";
import Pusher from "pusher-js";

interface Props {
  width: number;
  height: number;
  currentUser:
    | {
        _id: string;
        accessToken: string;
        username: string;
        email: string;
        about: string;
        image: string;
        name: string;
      }
    | undefined;
  targetUser: User;
}
const ButtonFollow = ({ width, height, currentUser, targetUser }: Props) => {
  const [userTarget, setUserTarget] = useState<User>(targetUser);
  const handleFollow = async () => {
    try {
      await followUser(currentUser?._id as string, userTarget._id);
    } catch (error) {
      alert("Internal server error");
      console.log(error);
    }
  };

  useEffect(() => {
    const pusher = new Pusher(process.env.PUSHER_KEY as string, {
      cluster: "ap1",
    });
    const chanel = pusher.subscribe("user");
    chanel.bind("followUser", function (data: any) {
      const user: User = data.user;
      setUserTarget(user);
    });
    return () => {
      pusher.unsubscribe("user");
    };
  }, []);

  // console.log(userTarget.following.find((id) => id === currentUser?._id.toString()));

  return (
    <>
      <button
        style={{ width: `${width}px`, height: `${height}px` }}
        className={`font-semibold rounded-lg  ${userTarget.followers.find((id) => id === currentUser?._id) ? "bg-[rgba(22,24,35,0.12)] text-black" : " text-white bg-[#FE2C55]"}`}
        onClick={handleFollow}
      >
        {userTarget.followers.find((id) => id === currentUser?._id) ? "Following" : "Follow"}
      </button>
    </>
  );
};

export default ButtonFollow;
