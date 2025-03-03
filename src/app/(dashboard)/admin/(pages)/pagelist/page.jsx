"use client"
import { useState, useEffect } from "react";
import { Plus } from "lucide-react"
import Link from "next/link";
import DataTable from "./pageTable";
import { getDataFromBackend } from "@/lib/features/formSlice";
import { useSelector, useDispatch } from "react-redux";

const page = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.form.data);
    const status = useSelector((state) => state.form.status);
    const error = useSelector((state) => state.form.error);

    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        dispatch(getDataFromBackend());
    }, [dispatch]);


    // const PageData = data.pages.map((dta) => ({
    //     id: dta.id,
    //     active: "yeas",

    // }))

    useEffect(() => {
        if (status === 'succeeded' && data?.pages?.length > 0) {
            const PageData = data.pages.map((dta) => ({
                id: dta.id,
                active: "yes",
                PageTitle: dta.title,
                Url: dta.url,
                CreatedAt: dta.created_at,
                action: ""
            }));
            setTableData(PageData);
        }
    }, [status, data]);

    console.log(tableData)

    // const PageDatas = data.pages.map((dta) => ({
    //     id: dta.id,
    //     active: "yes",
    //     PageTitle: dta.title,
    //     Url: dta.url,
    //     CreatedAt: dta.created_at,
    //     action: ""
    // }))
    // console.log(PageDatas)

    return (
        <>
            <section className="w-full justify-center relative">
                <header className='w-full h-14 flex justify-between items-center py-3 mt-16 border-b'>
                    <ul>
                        <h2 className='text-2xl'>Page</h2>
                    </ul>
                    <ul>
                        <Link href="/admin/addpage" className="flex justify-center items-center gap-2 rounded bg-black text-white px-4 py-1">
                            <Plus />
                            <p>Create Page</p>
                        </Link>
                    </ul>
                </header>
                <DataTable data={tableData} />
            </section>
        </>
    )
}

export default page