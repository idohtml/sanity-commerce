"use client";

import { ClerkLoaded, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import Form from "next/form";
import { PackageIcon, TrolleyIcon } from "@sanity/icons";
import { Button } from "./ui/button";

export default function Header() {
  const { user } = useUser();

  const createClerkPasskey = async () => {
    try {
      const response = await user?.createPasskey();
      console.log(response);
    } catch (error) {
      console.error("Error:", JSON.stringify(error, null, 2));
    }
  };

  return (
    <header className="flex flex-wrap items-center justify-between px-4 py-2">
      <div className="flex w-full flex-wrap items-center justify-between">
        <Link
          href="/"
          className="mx-auto cursor-pointer text-2xl font-bold text-blue-500 hover:opacity-50 sm:mx-0"
        >
          Logo
        </Link>
        <Form
          action="/search"
          className="mt-2 w-full sm:mx-4 sm:mt-0 sm:w-auto sm:flex-1"
        >
          <input
            type="text"
            name="query"
            placeholder="Search for products"
            className="w-full max-w-4xl rounded border bg-gray-100 px-4 py-2 text-gray-800 focus:outline-none focus:ring-opacity-50"
          />
        </Form>
        <div className="flex flex-1 items-center space-x-4 sm:mt-0 sm:flex-none">
          <Link
            href="/basket"
            className="relative flex flex-1 items-center justify-center space-x-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 sm:flex-none sm:justify-start"
          >
            <TrolleyIcon className="h-6 w-6" />
            <span>My Basket</span>
          </Link>
          {/* USER AREA */}
          <ClerkLoaded>
            {user && (
              <Link
                href="/orders"
                className="relative flex flex-1 items-center justify-center space-x-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 sm:flex-none sm:justify-start"
              >
                <PackageIcon className="h-6 w-6" />
                <span>My Orders</span>
              </Link>
            )}

            {user ? (
              <div className="flex space-x-2">
                <UserButton />
                <div className="hidden text-xs sm:block">
                  <p className="text-gray-400">Welcome back</p>
                  <p className="font-bold">{user.fullName}</p>
                </div>
              </div>
            ) : (
              <SignInButton mode="modal" />
            )}
            {user?.passkeys.length === 0 && (
              <Button
                onClick={createClerkPasskey}
                className="animate-pulse rounded border border-blue-300 bg-white px-4 py-2 font-bold text-blue-500 hover:bg-blue-700 hover:text-white"
              >
                Create passkey
              </Button>
            )}
          </ClerkLoaded>
        </div>
      </div>
    </header>
  );
}
