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

import CBS from "../images/cbs.png";
import NBC from "../images/nbc.png";
import TODAY from "../images/Today_logo.svg.png";
import INSIDE_EDITION from "../images/inside-edition.png";
import INSIDE from "../images/insider.png";
import KAISER from "../images/kaiser.png";
import SEVEN_NEWS from "../images/7news.png";
import YAHOO from "../images/yahoo.jpeg";
import NIH from "../images/NIH.png";
import MSN from "../images/msn.png";
import KCCURE from "../images/kccure.png";


import PhotoTitleLinkTable, {
  DynamicTable,
} from "../partials/dashboard/DynamicTable";
import COA from "../partials/dashboard/COA";

export const Dashboard = ({rates, demographics}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const socialData = [
    {
      id: "tiktok",
      title: "TikTok",
      total: "52,700",
      countType: "followers",
      link: "https://www.tiktok.com/@katiekickscancer",
      blurb:
        "Videos posted several times a week. Followers are cancer survivors, caregivers, and supporters.",
    },
    {
      id: "twitter",
      title: "Twitter",
      total: "7,400",
      countType: "followers",
      link: "https://twitter.com/kaydaustin",
      blurb:
        "Tweet at least once a week. Followers are mostly medical professionals, cancer survivors, caregivers, and supporters.",
    },
    {
      id: "instagram",
      title: "Instagram",
      total: "1,230",
      countType: "followers",
      link: "https://www.instagram.com/katiekickscancer/",
      blurb: "Stories posted daily from the day I was diagnosed.",
    },
    {
      id: "youtube",
      title: "YouTube",
      total: "1,210",
      countType: "subscribers",
      link: "https://www.youtube.com/channel/UCcf5yVgHvI8-__g0RHjfrTw",
      blurb:
        "Videos posted every few months. Informational content about cancer and my journey. YouTube shorts, once a week.",
    },
  ];

  const articles = [
    {
      id: "0",
      image: CBS,
      name: "CBS Evening News (National)",
      link: "https://twitter.com/cbseveningnews/status/1551702913566871553?lang=en",
      description:
        "Aired on CBS Evening News on July 26, 2022. Clip featuring me sharing my diagnosis with a potential employer.",
    },
    {
      id: "1",
      image: NBC,
      name: "NBC News Article (National)",
      link: "https://www.nbcnews.com/health/health-news/stage-4-kidney-cancer-diagnosis-didnt-stop-young-woman-getting-great-n-rcna31523",
      description:
        "She's 31 and has stage 4 kidney cancer. How she still got a great new job.",
    },
    {
      id: "2",
      image: TODAY,
      name: "Today Show (Online)",
      link: "https://www.today.com/health/health/kidney-cancer-diagnosis-rcna28501",
      description:
        "Doctors told woman, 29, she was too young for cancer. Then came the 'terrifying diagnosis'",
    },
    {
      id: "3",
      image: INSIDE,
      name: "Inside 1st Article",
      link: "https://www.insider.com/doctors-dismissed-29-year-old-anxiety-stage-4-kidney-cancer-2022-5",
      description:
        "Doctors told a 29-year-old she had anxiety and that she was 'too young for cancer.' She had stage 4 kidney cancer.",
    },
    {
      id: "4",
      image: INSIDE,
      name: "Inside 2nd Article",
      link: "https://www.insider.com/women-with-cancer-dismissed-by-doctors-for-being-too-young-2022-12",
      description:
        "3 women with cancer who were dismissed by doctors for being 'too young'",
    },
    {
      id: "5",
      image: INSIDE_EDITION,
      name: "Insider Edition",
      link: "https://www.insideedition.com/woman-diagnosed-with-kidney-cancer-after-doctors-dismissed-her-symptoms-as-anxiety-74966",
      description:
        "Doctors told a 29-year-old she had anxiety and that she was 'too young for cancer.' She had stage 4 kidney cancer.",
    },
    {
      id: "6",
      image: YAHOO,
      name: "Yahoo News",
      link: "https://www.yahoo.com/now/doctors-told-woman-29-she-161802957.html?guccounter=1&guce_referrer=aHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS8&guce_referrer_sig=AQAAAG38qkw2fNYic3YIcExxJusccNZWjZZdihbIYLGxfX5t69GIPTNmYaiDSRiOWW-0zaenQnS0aRo1w2XN-6ctqwoADo_oGQRSGgoeoh4ijdV3sKEzoy0lk3WgoYxYQpjdb3LR-cuESzd75uIaQDjsdL9k4H4ya9k3v3qseDaWDL2_",
      description:
        "Doctors told woman, 29, she was too young for cancer. Then came the 'terrifying diagnosis'",
    },
    {
      id: "7",
      image: KAISER,
      name: "Kaiser Health News",
      link: "https://khn.org/news/article/shes-31-has-stage-4-kidney-cancer-and-talked-openly-about-it-in-a-job-interview/",
      description:
        "She’s 31, Has Stage 4 Kidney Cancer — And Talked Openly About It in a Job Interview.",
    },
    {
      id: "8",
      image: NIH,
      name: "NIH / National Institutes of Health",
      link: "https://ccr.cancer.gov/news/article/all-about-the-drive-a-rare-kidney-cancer-meets-its-match-at-nih",
      description:
        "All about the drive: A rare kidney cancer meets its match at NIH",
    },
    {
      id: "9",
      image: MSN,
      name: "MSN News",
      link: "https://www.msn.com/en-us/health/medical/doctors-told-a-29-year-old-she-had-anxiety-and-that-she-was-too-young-for-cancer-she-had-stage-4-kidney-cancer/ar-AAXorMZ",
      description:
        "Doctors told a 29-year-old she had anxiety and that she was 'too young for cancer.' She had stage 4 kidney cancer.",
    },
    {
      id: "10",
      image: SEVEN_NEWS,
      name: "7 News (Australia)",
      link: "https://7news.com.au/lifestyle/health-wellbeing/texas-woman-katie-coleman-cancer-patient-and-advocate-lands-dream-job-c-7058198",
      description:
        "Texas woman Katie Coleman, cancer patient and advocate, lands dream job",
    },
    {
      id: "11",
      image: KCCURE,
      name: "KCCURE",
      link: "https://kccure.org/2021/03/voice-of-kidney-cancer-katie-coleman/",
      description: "Voice of Kidney Cancer – Katie Coleman",
    },
  ];

  const podcasts = [
    {
      id: "0",
      name: "The Doctors Art",
      link: "https://www.thedoctorsart.com/episodes/ep27",
      description: "3rd most popular medical podcast.",
    },
    {
      id: "1",
      name: "The Accelerators",
      link: "https://podcasts.apple.com/us/podcast/the-experts-discuss-patients-mental-health/id1582752362?i=1000591638089",
      description:
        "Ranked in top 25% of podcasts. Experts discuss mental health.",
    },
    {
      id: "2",
      name: "The Accelerators",
      link: "https://podcasts.apple.com/us/podcast/on-clinical-trials-the-patient-perspective-with/id1582752362?i=1000581856875",
      description: "Clinical trials - Part 1",
    },
    {
      id: "3",
      name: "The Accelerators",
      link: "https://podcasts.apple.com/us/podcast/on-clinical-trials-patient-education-with-julie-katie/id1582752362?i=1000585831016",
      description: "Clinical trials - Part 2",
    },
    {
      id: "4",
      name: "Inside 2nd Article",
      link: "https://www.insider.com/women-with-cancer-dismissed-by-doctors-for-being-too-young-2022-12",
      description:
        "3 women with cancer who were dismissed by doctors for being 'too young'",
    },
    {
      id: "4",
      name: "HealthCare Unfiltered",
      link: "https://podcasts.apple.com/au/podcast/patient-voice-on-social-media-a-survivor-story/id1534737585?i=1000563486434",
      description: "Patient voice on social media - A survivor story",
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      {/*<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />*/}

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        {/*<Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />*/}

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Welcome banner */}
            <WelcomeBanner />

            <div className="text-3xl font-bold text-slate-800 mt-20 mb-7">
              Socials and Media
            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6 mb-6 ">
              {socialData.map((social) => (
                <DashboardCard
                  key={social.id}
                  title={social.title}
                  total={social.total}
                  countType={social.countType}
                  link={social.link}
                  blurb={social.blurb}
                />
              ))}
            </div>
            <div className="grid grid-cols-12 gap-6">

              {rates ? <TopChannels size="small" /> : <TopChannels size="large" />}
              {rates ? <Customers size="small" /> : <Customers size="large" />}
              {rates ? <Rates /> : null}

              <DynamicTable
                data={podcasts}
                tableTitle={"Podcasts"}
                size={demographics ? "small" : "large"}
              />
              {demographics ? <Demographics /> : null }
              <DynamicTable
                data={articles}
                tableTitle={"News/Articles"}
                size="large"
              />

              <COA />

              {/*<PhotoTitleLinkTable*/}
              {/* Card (Recent Activity) */}
              {/*<DashboardCard12 />*/}
            </div>
          </div>
        </main>

        <Banner />
      </div>
    </div>
  );
};

export default Dashboard;
