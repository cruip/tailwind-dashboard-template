"use client"

import * as React from "react"
import { DayPicker } from "react-day-picker"

import { cn } from "../../lib/utils"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3 text-gray-600 dark:text-gray-100", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-y-0",
        month_caption: "flex justify-center pt-1 pb-3 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "absolute flex items-center justify-between gap-1 inset-x-3 top-3",
        button_previous: "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none size-7 bg-transparent p-0 opacity-50 hover:opacity-100 z-50",
        button_next: "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none size-7 bg-transparent p-0 opacity-50 hover:opacity-100 z-50",
        month_grid: "w-full border-collapse space-y-1",
        weekdays: "flex",
        weekday:
          "text-gray-400 dark:text-gray-500 font-medium rounded-md w-9 text-[0.8rem]",
        week: "flex w-full mt-2",
        day: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-green-500/50 [&:has([aria-selected])]:bg-violet-500 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day_button: "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-violet-500 hover:text-white h-9 w-9 p-0 aria-selected:opacity-100",
        range_start:
          "rounded-l-lg",
        range_end: "day-range-end rounded-r-lg",
        selected:
          "bg-violet-500 text-white hover:bg-violet-500 hover:text-white focus:bg-violet-500 focus:text-white",
        today: "bg-violet-500 text-white",
        outside:
          "day-outside text-gray-400 dark:text-gray-500 aria-selected:bg-violet-500/50 aria-selected:text-gray-400 dark:text-gray-500",
        disabled: "text-gray-400 dark:text-gray-500 opacity-50",
        range_middle:
          "aria-selected:bg-violet-500/70 aria-selected:text-white",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: (props) => {
          if (props.orientation === "left") {
            return <svg className="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>;
          }
          return <svg className="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>;
        }
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
