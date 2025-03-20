"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, AlignJustify, SquarePen } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from 'react-hot-toast';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import DataTable from "@/components/data-table/DataTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchqustion } from "@/lib/features/qustionslice";

const page = () => {
  const dispatch = useDispatch();
  const { questions } = useSelector((state) => state.qustions);

  useEffect(() => {
    dispatch(fetchqustion());
  }, [dispatch]);

  const data = questions.map((question) => ({
    id: question.id,
    qustion: question.title,
    type: question.questionType,
    active: "",
    createdat: question.created_at,
  }));

  const columns = [
    {
      accessorKey: "id",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
    },
    // {
    //   accessorKey: "id",
    //   header: "ID",
    //   cell: ({ row }) => {
    //     return <div>{row.getValue("id")}</div>;
    //   },
    // },
    {
      accessorKey: "qustion",
      header: "Qustion",
      cell: ({ row }) => {
        return <div>{row.getValue("qustion")}</div>;
      },
    },
    {
      accessorKey: "type",
      header: "Type ",
      cell: ({ row }) => {
        return <div>{row.getValue("type")}</div>;
      },
    },
    {
      accessorKey: "active",
      header: "Required?",
      cell: () => {
        const [isYes, setIsYes] = useState(false);
        return (
          <Toggle
            pressed={isYes}
            onPressedChange={setIsYes}
            className={`!text-white w-5 h-5 ${isYes ? "!bg-green-600" : "!bg-red-400"
              }`}
          >
            {isYes ? "Yes" : "No"}
          </Toggle>
        );
      },
    },
    {
      accessorKey: "createdat",
      header: "Created At",
      cell: ({ row }) => {
        const date = new Date(row.getValue("createdat"));
        const formattedDate = date.toLocaleDateString("en-GB");

        return <div>{formattedDate}</div>;
      },
    }
  ];



  const handleDelete = async (selectedIds) => {

    if (selectedIds.length === 0) {
      toast.error("No rows are selected to delete");
      return;
    }

    const confirmDelete = async () => {
      return new Promise((resolve) => {
        toast(
          (t) => (
            <div>
              <p>Are you sure you want to delete {selectedIds.length} items?</p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => {
                    toast.dismiss(t.id);
                    resolve(true);
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Yes
                </button>
                <button
                  onClick={() => {
                    toast.dismiss(t.id);
                    resolve(false);
                  }}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  No
                </button>
              </div>
            </div>
          ),
          { duration: Infinity }
        );
      });
    };

    const confirmed = await confirmDelete();


    if (!confirmed) {
      return;
    }

    try {
      const response = await axios.post(`https://breezend-backend-2.onrender.com/api/job/delete-qustion`,
        { id: selectedIds }
      )
      console.log("Deleted successfully:", response.data);
      toast.success("Selected rows deleted successfully!")
      await dispatch(fetchqustion()).unwrap();

      resetSelection();
    } catch (error) {
      console.error("Delete Qestion API error", error.response?.data || "Something wents wrong")
    }
  }

  return (
    <section className="w-full min-h-screen mb-20">
      <header className="w-full h-14 flex justify-between items-center py-3 mt-16 border-b">
        <ul>
          <h2 className="text-2xl">Questions</h2>
        </ul>
        <ul>
          <Link
            href="/dashboard/admin/career/questions/create"
            className="flex justify-center items-center gap-2 rounded bg-black text-white px-2 py-1"
          >
            <Plus />
            <p>Add Questions</p>
          </Link>
        </ul>
      </header>
      <main className="w-full flex gap-2 mt-5">
        <DataTable data={data} columns={columns} handleDelete={handleDelete} />
      </main>
    </section>
  );
};

export default page;

