"use client"
import React from 'react'
// import { Calendar, momentLocalizer } from 'react-big-calendar'
// import moment from 'moment'

const localizer = momentLocalizer(moment)
const Page = () => {
    return (
        <section className='w-full min-h-screen'>
            <header className='w-full h-14 py-3 mt-16 border-b'>
                <h2 className='text-2xl'>Interview Schedule</h2>
            </header>
            {/* <div className="grid grid-rows-8">
                <Calendar
                    localizer={localizer}
                // events={myEventsList}
                // startAccessor="start"
                // endAccessor="end"
                />
            </div> */}
        </section>
    )
}

export default Page