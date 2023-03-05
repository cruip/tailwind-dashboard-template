import React, { useState } from "react";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";

import OrangeBackground from "../images/orange_background.png";

import COA from "../partials/dashboard/COA";
import { advocacy, advocacy2 } from "../utils/Data";

import headshot from "../images/katie-head-shot.png";
import bookcover3 from "../images/bookcover3.png";
import VideoCard from "../partials/dashboard/VideoCard";
import Videos from "./Videos";
import AdvocacyCard from "../partials/dashboard/AdvocacyCard";
import { iconStyling } from "../utils/Utils";

export const Advocacy = () => {
  return (
    <div className="h-screen relative">
      <div
        className="absolute inset-0 flex h-screen overflow-hidden"
        style={{ backgroundImage: `url(${OrangeBackground})` }}
      >
        <div
          className="relative flex flex-col flex-1 overflow-y-auto bg-orange-500 bg-opacity-50 overflow-x-hidden opacity-100"
          style={{ backdropFilter: "blur(5px)" }}
        >
          <main>
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
              <div className="w-full">
                <div className="flex justify-center w-full mb-10">
                  <div className="justify-center">
                    <div className="justify-center flex flex-row text-5xl font-bold text-white mt-5 w-full center-text w-full rounded">
                      Light the City Orange
                    </div>
                    <p className="flex justify-center w-full text-2xl font-semibold text-neutral-900">
                      In Support of Those Affected by Kidney Cancer
                    </p>
                  </div>
                </div>
                <div className="mb-10">
                  <p className="flex mx-auto justify-center sm:text-left lg:text-center  w-3/4 font-semibold text-neutral-900">
                    Join us as we #OrangeUp in support of those who are affected
                    by kidney cancer.
                  </p>
                  <p className="flex mx-auto justify-center sm:text-left lg:text-center w-3/4 font-semibold text-neutral-900">
                    This year around 81,800 individuals in the US alone will be
                    diagnosed with this disease.
                  </p>
                  <p className="flex mx-auto justify-center w-3/4 sm:text-left lg:text-center font-semibold text-neutral-900">
                    We've asked businesses in our city to display orange lights
                    in their storefronts, lobbies, and windows.
                  </p>
                  <p className="flex mx-auto justify-center w-3/4 sm:text-left lg:text-center font-semibold text-neutral-900">
                    A simple yet powerful gesture that shows solidarity with
                    kidney cancer patients and their families.{" "}
                  </p>
                  <p className="flex mx-auto justify-center w-3/4 sm:text-left lg:text-center font-semibold text-neutral-900 text-xl mt-5">
                    #OrangeUp to join the cause
                  </p>
                </div>
                <hr />
              </div>

              <div>
                <div className="text-3xl font-bold text-white mt-12 mb-7">
                  How do advocacy campaigns make an impact?
                </div>
                <div className="grid grid-cols-12 gap-6 mb-6 ">
                  {advocacy.map((advocacy) => (
                    <AdvocacyCard
                      title={advocacy.title}
                      blurb={advocacy.description}
                      link={advocacy.link}
                      key={advocacy.id}
                      icon={advocacy.icon}
                    />
                  ))}
                </div>
              </div>
              <div className="text-3xl font-bold text-white mt-10 mb-7">
                Donate
              </div>
              <div className="grid grid-cols-12 gap-6 mt-10">
                <COA type="query" />
              </div>

              <div className="text-3xl font-bold text-white mt-10 mb-7">
                Meet a Local Survivor
              </div>

              {/*Author Bio*/}
              <div>
                <div className="flex flex-col col-span-full sm:col-span-12 xl:col-span-12 bg-white shadow-lg rounded-sm border border-slate-200">
                  <div className="p-5">
                    <div className="flex flex-col lg:flex-row xl:flex-row">
                      <div className="w-44 h-54 rounded-lg w-full mr-5 mb-5 w-full self-center ">
                        <img
                          className="h-full w-full rounded"
                          src={headshot}
                          width="100"
                          height="100"
                          alt="headshot"
                        />
                      </div>
                      <div className="flex w-full ">
                        <a href="https://katiekickscancer.com" target="_blank">
                          <div className="flex flex-col bm-">
                            <div className=" font-semibold text-slate-700 uppercase mb-1">
                              Local stage IV kidney cancer survivor donates all
                              proceeds from social media to research.
                            </div>
                            <div className="text-sm">
                              <p className="p-1">
                                {" "}
                                My name is Katie a stage IV kidney cancer
                                survivor and patient advocate. I was diagnosed
                                with a rare stage IV cancer at 29 years old. Due
                                to the rarity and extent of my disease (15+
                                tumors), my options were limited and my
                                prognosis was bleak. However, due to advocacy
                                efforts of others I was able to make it to a
                                life saving surgery about 6 month into my
                                diagnosis.
                              </p>

                              <p className="p-1">
                                That surgery changed everything and is the
                                reason I'm still here today. I'm using that gift
                                to pay it forward to others by raising awareness
                                and funding research because more patients
                                deserve outcomes like I've had.
                              </p>

                              <p className="p-1">
                                I've started a non-profit which funds research
                                for a rare kidney cancer. I also advocate online
                                and donate all proceeds from social media to
                                research.
                              </p>
                              <button
                                type="button"
                                className="mt-2 mb-2 text-white bg-orange-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
                              >
                                Socials / More Info
                              </button>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-3xl font-bold text-white mt-12 mb-7">
                  How can you help?
                </div>
                <div className="grid grid-cols-12 gap-6 mb-6 ">
                  {advocacy2.map((advocacy) => (
                    <AdvocacyCard
                      title={advocacy.title}
                      blurb={advocacy.description}
                      link={advocacy.link}
                      key={advocacy.id}
                      icon={advocacy.icon}
                    />
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export const StandOut = () => {
  return (
    <div>
      <div className="text-3xl font-bold text-slate-800 mt-5 mb-4">
        What makes my story stand out
      </div>
      <div className="text-sm p-4 flex flex-col col-span-full sm:col-span-12 xl:col-span-12 bg-white shadow-lg rounded-sm border border-slate-200">
        <ul className="list-disc text-sm ml-4 p-4">
          <li className="p-1">
            Having an extremely rare cancer (single digit case reports,
            worldwide, in history)
          </li>
          <li className="p-1">
            Being diagnosed just two months after getting married, at 29 years
            old
          </li>
          <li className="p-1">
            The dramatic shift in prognosis (from terminal to no evidence of
            disease) I had after perservering through many obstacles and
            learning to advocate for myself
          </li>
          <li className="p-1">
            I donate everything I make from social media to research and will be
            donating everything from this book as well
          </li>
          <li className="p-1">Battling cancer through a pandemic</li>
          <li className="p-1">
            Perspective from someone who has been afraid of everything my entire
            life, I don't paint myself as a "strong" fighter. I share the
            realness of my story as the poster child for "if you can't beat
            fear, do it scared"
          </li>
          <li className="p-1">
            Offering a new definition of strength: "strength isn't the absense
            of fear but instead a product of perservering through it"
          </li>
          <li className="p-1">
            Overcoming medical complications, a blood shortage and almost losing
            my one chance at surgery as my team tried to prepare resources for a
            "catastrophic bleed"
          </li>
          <li className="p-1">
            The dedication of my life after surgery to giving back and helping
            others. Changing careers and building an app for patients
          </li>
          <li className="p-1">
            Sharing a evolutionary journey from being too scared to talk to
            strangers to sharing my life as an open book online with millions
          </li>
          <li className="p-1">
            Focus on gratitude and tangible advice on what helped me reframe my
            thinking and how I learned to live in the moment
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Advocacy;
