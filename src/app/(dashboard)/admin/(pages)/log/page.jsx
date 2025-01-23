"use client";
import React, { useEffect } from "react";
import Link from "next/link"
import Image from "next/image";
// import { useDispatch } from "react-redux";
// import { setHeader, clearHeader } from "@/lib/features/headerSlice";
import LogTable from "./LogTable";

const page = () => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(
  //     setHeader({
  //       title: "Log",
  //       buttons: [
  //         { label: "Create", href: "/" },
  //         { label: "Back", href: "/profile" },
  //       ],
  //     })
  //   );

  //   return () => {
  //     dispatch(clearHeader());
  //   };
  // }, [dispatch]);
  return (
    <>
      <section className="w-full justify-center relative mt-16">
        <header className='w-full h-14 flex justify-between items-center py-3 mt-16 border-b'>
          <h2 className='text-2xl'>Logs</h2>
        </header>
        <LogTable />
      </section>
    </>
  );
};

export default page;
