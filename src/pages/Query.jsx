import React, { useState } from "react";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import WelcomeBanner from "../partials/dashboard/WelcomeBanner";
import DashboardCard from "../partials/dashboard/DashboardCard";
import Demographics from "../partials/dashboard/Demographics";
import TopChannels from "../partials/dashboard/TopChannels";
import Customers from "../partials/dashboard/Customers";
import DashboardCard12 from "../partials/dashboard/DashboardCard12";
import Banner from "../partials/Banner";
import { Rates } from "../partials/dashboard/Rates";

import Docs from "../images/docs.png";

import PhotoTitleLinkTable, {
  DynamicTable,
} from "../partials/dashboard/DynamicTable";
import COA from "../partials/dashboard/COA";
import {
  articles,
  comparables,
  podcasts,
  socialData,
  tikTokVideos,
  youtubeVideos,
} from "../utils/Data";
import ComparablesCard from "../partials/dashboard/ComparablesCard";
import PodcastCard from "../partials/dashboard/PodcastCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faBookOpen,
  faSquareArrowUpRight,
} from "@fortawesome/free-solid-svg-icons";
import austin from "../images/austin.jpg";
import medium from "../images/medium.png";
import headshot from "../images/katie-head-shot.png";
import bookcover3 from "../images/bookcover3.png";
import VideoCard from "../partials/dashboard/VideoCard";
import Videos from "./Videos";

export const Query = ({ rates, demographics, type }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      {/*<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />*/}

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Welcome banner */}
            {/*<WelcomeBanner type={type} />*/}

            <div className="w-full">
              <div className="flex justify-center w-full mb-16">
                <div className="justify-center">
                  <div className="w-full w-48 h-48 rounded mx-auto ">
                    <img
                      className="mx-auto h-full w-full rounded"
                      src={bookcover3}
                      width="100"
                      height="100"
                      alt="headshot"
                    />
                  </div>
                  <div className="justify-center flex flex-row text-5xl font-bold text-slate-800 mt-5 w-full center-text w-full rounded">
                    Life Refocused
                  </div>
                  <p className="flex justify-center w-full text-2xl font-semibold">
                    Memoir of a life shaped by cancer
                  </p>
                  {/*<div className="w-full w-40 h-40 mx-auto ">*/}
                  {/*  <img*/}
                  {/*    className="mx-auto h-full w-full rounded"*/}
                  {/*    src={bookcover}*/}
                  {/*    width="100"*/}
                  {/*    height="100"*/}
                  {/*    alt="headshot"*/}
                  {/*  />*/}
                  {/*</div>*/}
                </div>
              </div>
              <hr />

              {/*About the book*/}
              <div>
                <div className="text-3xl font-bold text-slate-800 mt-5 mb-4">
                  Summary
                </div>
                <div className="text-sm p-4 flex flex-col col-span-full sm:col-span-12 xl:col-span-12 bg-white shadow-lg rounded-sm border border-slate-200">
                  <p className="block p-1">
                    I never saw myself standing where I am now but I'm proof
                    that{" "}
                    <b>
                      "strength isn't the absence of fear but instead a product
                      of persevering through it"
                    </b>{" "}
                    and I hope to bring this perspective to readers through my
                    book.
                  </p>
                  <p className="block p-1">
                    {" "}
                    In "Life Refocused," I share my personal journey of being
                    diagnosed with an extremely rare (single digits, worldwide,
                    in history) Stage IV cancer on New Year's Eve 2020, as a 29
                    year old newly wed. I take readers through the shock and
                    disbelief I struggled to overcome after years of being told
                    by doctors that I was "too young for cancer" and the
                    difficult decisions I had to make, such as forgoing my
                    honeymoon and moving across the country in search of
                    experts.{" "}
                  </p>

                  <p className="block p-1">
                    {" "}
                    The type of tumor I had is typically supposed to be benign,
                    it never spreads. Except in my case of course, in which case
                    the tumor on my right kidney, that was larger than a
                    softball, spread to my liver with over 15 tumors throughout.
                    Giving me a Stage IV cancer diagnosis that would render me
                    inoperable. I take readers through what it was like to go
                    from being inoperable with an advanced cancer and a bleak
                    prognosis to no active cancer through a series of
                    serendipitous events that would teach me many life lessons
                    along the way, that anyone looking to make the most of life
                    can learn from.
                  </p>
                </div>
              </div>

              {/*Notable Events*/}
              <StandOut />
              {/*Audience*/}
              <div>
                <div className="text-3xl font-bold text-slate-800 mt-12 mb-4">
                  Audience
                </div>
                <div className="flex flex-col col-span-full sm:col-span-4 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
                  <ul className="list-disc text-sm ml-4 p-4">
                    <li className="p-1">
                      <b>Cancer survivors and their families:</b> My story is
                      relatable and inspiring for those who have gone through a
                      similar experience.{" "}
                    </li>
                    <li className="p-1">
                      <b>Personal development readers:</b> My story of
                      overcoming the odds and finding purpose in life will
                      resonate with readers who are interested in personal
                      growth and self-improvement.
                    </li>
                    <li className="p-1">
                      <b>Health and wellness readers:</b> My book will appeal to
                      readers who are interested in health, wellness, and
                      overcoming adversity.
                    </li>
                    <li className="p-1">
                      <b>Social media followers:</b> I have a following on
                      social media, which could translate into a built-in
                      audience for my book. Some of my videos with the most
                      views are me narrating my story (500k).
                    </li>
                    <li className="p-1">
                      <b>National media readers:</b> National articles have been
                      written about my case, so it is likely to have gained some
                      attention which may lead to readership.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/*Author Bio*/}
            <div>
              <div className="text-3xl font-bold text-slate-800 mt-12 mb-4">
                About the Author
              </div>
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
                    <div className="flex w-full">
                      <a
                        href="https://docs.google.com/document/d/1e-EKszKP4nbMNtuQ1PyJ2xKC5ljR2zlSsU8jXF4DO0M/edit"
                        target="_blank"
                      >
                        <div className="flex flex-col">
                          <div className="text-xs font-semibold text-slate-400 uppercase mb-1">
                            Katie Coleman •Stage IV Cancer Survivor • Software
                            Engineer • Content Creator • Writer (Memoir) •
                            Non-Profit Founder
                          </div>
                          <div className="text-sm">
                            <p className="p-1">
                              {" "}
                              My name is Katie and I am a cancer survivor and
                              patient advocate. I was diagnosed with a rare
                              stage IV cancer at 29-years old and just two
                              months after getting married, but I have not let
                              cancer define me. Instead, I have used my personal
                              experience to become a visible patient advocate
                              for kidney cancer. My story has been featured in
                              national news articles such as NBC, Today and
                              Yahoo and it was highlighted on the national CBS
                              Evening News as well. I'm an introvert by nature
                              so sharing my life publicly has been a big change
                              but the experience of sharing my story has been
                              incredibly rewarding as I've been able to connect
                              with other patients and survivors and the process
                              has helped has helped me grow in ways I never
                              thought possible.
                            </p>

                            <p className="p-1">
                              In addition to my advocacy work, I am a software
                              engineer and I have even found a new job during my
                              treatment. I was transparent about my diagnosis
                              through the interview process which gained a lot
                              of attention but helped provide me with insight on
                              how navigate the difficult task. I am also the
                              founder of a non-profit organization and I am
                              currently starting a new podcast with another
                              patient and doctor where we'll talk openly about
                              navigating life and treatment with cancer and
                              provide a platform for other patients to share
                              their experiences.
                            </p>

                            <p className="p-1">
                              My personal experience, professional background,
                              and dedication to advocacy make me the perfect
                              author for this memoir. I hope to inspire others
                              to find purpose in life and to never give up hope.
                              I am donating the proceeds of this book for
                              research and am excited to share my story with the
                              world.
                            </p>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/*Writing Examples*/}
            <div>
              <div className="flex  text-3xl font-bold text-slate-800 mt-12 mb-4">
                Blog Articles{" "}
                <span className="pl-2 text-lg self-center text-slate-600 h-full font-medium mb-0 ">
                  (Writing Example)
                </span>
              </div>
              <div className="flex flex-col col-span-full sm:col-span-12 xl:col-span-12 bg-white shadow-lg rounded-sm border border-slate-200">
                <div className="p-4">
                  <header className="flex xl:float-right lg:float-right mb-2">
                    {/* Icon */}
                    <div className="hidden  sm:block">
                      <div className="flex items-start ">
                        <div className="text-3xl font-bold text-slate-800 mr-2">
                          {type === "query" ? "" : "Donate"}
                        </div>
                        <a
                          href="https://medium.com/@katie.coleman.ut/having-cancer-made-me-better-at-my-job-5fef3406b4db"
                          target="_blank"
                          className="text-blue-500"
                        >
                          <FontAwesomeIcon icon={faSquareArrowUpRight} />
                        </a>
                      </div>
                    </div>
                  </header>
                  <div className="flex flex-col lg:flex-row xl:flex-row">
                    {/*image*/}
                    <div className="relative w-40 h-40 aspect-square w-full mx-auto mb-2 sm:mb-2 md:mb-2 lg:mb-0 xl:mb-0 2xl:mb-0 ">
                      <div
                        className={`${
                          false
                            ? "flex items-center justify-center w-40 h-40 rounded-lg bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-indigo-200 to-violet-700 opacity-50 shadow-m"
                            : "hidden"
                        }`}
                      ></div>
                      <img
                        src={medium}
                        alt="blog"
                        className={`${true ? "rounded w-40 h-40" : "hidden"}`}
                      />
                    </div>
                    {/*text section*/}
                    <div className="flex w-full ml-3">
                      <a
                        href="https://medium.com/@katie.coleman.ut/having-cancer-made-me-better-at-my-job-5fef3406b4db"
                        target="_blank"
                      >
                        <div className="flex flex-col">
                          <h2 className="text-lg font-semibold text-slate-800 mb-2">
                            Having Cancer Made Me Better At My Job
                          </h2>
                          <div className="text-sm">
                            <p className="p-1">
                              {" "}
                              It’s been a long journey of treatment, surgery and
                              procedures but I’ll spare you the details to
                              prevent this from turning into a three part novel.
                              It’s been a wild ride so far and while cancer has
                              become my greatest & most fierce enemy, it has
                              also become my greatest strength. Which is how
                              I’ve found myself here, writing a blog, about how
                              cancer has made me not only a better person but a
                              better employee. So, let’s talk about it by
                              breaking down a few qualities crucial to success
                              in almost any role.
                            </p>
                            <p className="p-1">
                              {" "}
                              So, let’s talk about it by breaking down a few
                              qualities crucial to success in almost any role.
                            </p>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="text-3xl font-bold text-slate-800 mt-12 mb-7">
                Comparables
              </div>
              <div className="grid grid-cols-12 gap-6 mb-6 ">
                {comparables.map((comparable) => (
                  <ComparablesCard
                    title={comparable.name}
                    blurb={comparable.description}
                    type="books"
                    link={comparable.link}
                    key={comparable.id}
                    image={comparable.image}
                    pages={comparable.pages}
                    author={comparable.author}
                  />
                ))}
              </div>
            </div>

            <div className="text-3xl font-bold text-slate-800 mt-20 mb-7">
              Existing Platform
            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6 mb-6 ">
              {socialData(type).map((social) => (
                <DashboardCard
                  key={social.id}
                  title={social.title}
                  total={social.total}
                  countType={social.countType}
                  link={social.link}
                  blurb={social.blurb}
                  type={type}
                />
              ))}
            </div>
            <div className="grid grid-cols-12 gap-6">
              <TopChannels size="large" />
              <Customers size="large" />

              {rates ? <Rates /> : null}

              <DynamicTable
                data={podcasts(type)}
                tableTitle={"Podcasts"}
                size={demographics ? "small" : "large"}
              />
              {/*{demographics ? <Demographics /> : null}*/}
              <DynamicTable
                data={articles}
                tableTitle={"News/Articles"}
                size="large"
              />

              <COA type="query" />
            </div>

            <hr className="w-full mt-6" />
            <div className="text-3xl font-bold text-slate-800 mt-12 mb-7">
              Sample - Life Refocused
            </div>
            <div className="flex flex-col col-span-full sm:col-span-15 xl:col-span-15 bg-white shadow-lg rounded-sm border border-slate-200">
              <div className="px-5 pt-5">
                <header className="flex xl:float-right lg:float-right mb-2">
                  {/* Icon */}
                  <div className="">
                    <div className="flex items-start ">
                      <div className="text-3xl font-bold text-slate-800 mr-2">
                        {type === "query" ? "" : "Donate"}
                      </div>
                      <a
                        href="https://docs.google.com/document/d/1e-EKszKP4nbMNtuQ1PyJ2xKC5ljR2zlSsU8jXF4DO0M/edit?usp=sharing"
                        target="_blank"
                        className="text-blue-500"
                      >
                        <FontAwesomeIcon icon={faSquareArrowUpRight} />
                      </a>
                    </div>
                  </div>
                </header>
                <div className="flex flex-col lg:flex-row xl:flex-row">
                  <div className="w-40 h-40 rounded-lg w-full mr-5 mb-5 w-full">
                    <img
                      className="h-full w-full"
                      src={Docs}
                      width="100"
                      height="100"
                      alt="GOOGLE"
                    />
                  </div>
                  <div className="flex w-3/4">
                    <a
                      href="https://docs.google.com/document/d/1lgIVsf36_a33npvomi1URrBW74ruT-9DmFG7vb0ZfFM/edit?usp=sharing"
                      target="_blank"
                    >
                      <div className="flex flex-col">
                        <h2 className="text-lg font-semibold text-slate-800 mb-2">
                          Sample (first 5 pages)
                        </h2>
                        <div className="text-xs font-semibold text-slate-400 uppercase mb-1">
                          Life Refocused: Memoir of a life shaped by cancer
                        </div>
                        <div className="w-full">
                          <p className="text-xs text-slate-600 mb-5">
                            When I look back on the twenty-nine year old newly
                            wed, with tear stained cheeks, receiving a stage IV
                            cancer diagnosis in the ER that cold December night
                            - I see a familiar face but a woman almost
                            unrecognizable to me now. Over the next two years,
                            whether I liked it or not, cancer would soon shift
                            and reshape every aspect of my life. It would test
                            and prove my marriage. It’d reach deep into the
                            depths of my greatest fears and bring with it great
                            sorrow and despair. But over time it’d also bring
                            hope, love and gratitude. It would require me to
                            speak up, learn to advocate for myself and force me
                            to find my voice. As the once shy, quiet girl in the
                            back of the room, I’d soon bring my life to the
                            center stage.
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <hr className="w-full mt-12" />
            <Videos type={"query"} />
          </div>
        </main>
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

export default Query;
