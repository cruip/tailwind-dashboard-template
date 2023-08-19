/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
// import { ChevronDownIcon } from '@heroicons/react/solid'
import { SVGIcon } from "./icons/SvgIcon";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DropDown({ name, links }) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none ">
          <span className="mr-1 ">{name || "action"}</span>
          <SVGIcon name="down-arrow" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-20 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {links?.map((item, i) => {
              if(!item) return
              return item.isLink ? (
                <Menu.Item key={i}>
                  {({ active }) => (
                    <Link
                      to={item.link}
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        " px-4 py-2 text-sm flex items-center"
                      )}
                    >
                       <SVGIcon name={`${item.icon || "info"}`} /> 
                      <span className="ml-2 ">{item.name}</span>
                    </Link>
                  )}
                </Menu.Item>
              ) : (
                <Menu.Item key={i}>
                  {({ active }) => (
                    <span
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "flex items-center px-4 py-2 text-sm"
                      )}
                      onClick={item.onclick}
                    >
                     <SVGIcon name={`${item.icon || "info"}`} /> 
                      <span className="ml-2 ">{item.name}</span>
                    </span>
                  )}
                </Menu.Item>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
