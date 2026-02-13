"use client"
import React from "react";
import { assets, BagIcon, BoxIcon, CartIcon, HomeIcon} from "@/assets/assets";
import Link from "next/link"
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { ClerkLoaded, ClerkLoading,useClerk, UserButton } from "@clerk/nextjs";
import { isMobile } from "react-device-detect";

const Navbar = () => {

  const { isSeller, router, user } = useAppContext();
  const { openSignIn } = useClerk();
  const navLinks = [
    { label: "Home", path: "/", icon: <HomeIcon />, mobileOnly: true },
    { label: "Products", path: "/all-products", icon: <BoxIcon />, mobileOnly: true },
    { label: "Cart", path: "/cart", icon: <CartIcon />, mobileOnly: false },
    { label: "My Orders", path: "/my-orders", icon: <BagIcon />, mobileOnly: false },
  ];
  /**
   * UserNavbar Component
   * Handles the authentication UI logic:
   * - Displays a loading placeholder while Clerk is initializing
   * - Renders the UserButton component if the user is signed in
   * - Filters navigation links based on device type using the react-device-detect library
   * @returns A responsive authentication and navigation fragment
   */
  const UserNavbar = () => {
    return (
      <div className="flex items-center gap-3">
        <ClerkLoading>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 animate-pulse bg-gray-200 rounded-full" />
            <div className="h-4 w-16 animate-pulse bg-gray-200 rounded" />
          </div>
        </ClerkLoading>
        <ClerkLoaded>
        {
          user 
          ? <UserButton>
                <UserButton.MenuItems>
                  {navLinks
                  .filter((link) => (isMobile ? true : !link.mobileOnly))
                  .map((link) => (
                    <UserButton.Action
                      key={link.path}
                      label={link.label}
                      labelIcon={link.icon}
                      onClick={ () => router.push(link.path) }
                    />
                  ))}
                </UserButton.MenuItems>
              </UserButton>
          : <button onClick={openSignIn} className="flex items-center gap-2 hover:text-gray-900 transition">
            <Image src={assets.user_icon} alt="user icon" />
            Account
          </button>
        }
        </ClerkLoaded>
      </div>
    );
  };

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700">
      <Image
        className="cursor-pointer w-28 md:w-32"
        onClick={() => router.push('/')}
        src={assets.logo}
        alt="logo"
      />
      <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
        <Link href="/" className="hover:text-gray-900 transition">
          Home
        </Link>
        <Link href="/all-products" className="hover:text-gray-900 transition">
          Shop
        </Link>
        <Link href="/" className="hover:text-gray-900 transition">
          About Us
        </Link>
        <Link href="/" className="hover:text-gray-900 transition">
          Contact
        </Link>

        {isSeller && <button onClick={() => router.push('/seller')} className="text-xs border px-4 py-1.5 rounded-full">Seller Dashboard</button>}

      </div>
      < UserNavbar />
    </nav>
  );
};

export default Navbar;