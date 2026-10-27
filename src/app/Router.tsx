import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import { HomePage } from "../pages/HomePage";
import { AboutPage } from "../pages/AboutPage";
import { IndependencePage } from "../pages/IndependencePage";
import { StreamPage } from "../pages/StreamPage";
import { StreamDetailPage } from "../pages/StreamDetailPage";
import { PollPage } from "../pages/PollPage";
import { ContactPage } from "../pages/ContactPage";
import { RoadmapPage } from "../pages/RoadmapPage";
import { DesignPage } from "../pages/DesignPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { programs, getProgram } from "../data/programs";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "about/independence", element: <IndependencePage /> },
      {
        path: "jashn",
        element: <StreamPage kind="jashn" />,
        loader: () => ({ programs }),
      },
      {
        path: "jashn/:slug",
        element: <StreamDetailPage kind="jashn" />,
        loader: ({ params }) => {
          const p = params.slug ? getProgram(params.slug) : undefined;
          if (!p) throw new Response("Not found", { status: 404 });
          return p;
        },
      },
      { path: "khatereh", element: <StreamPage kind="khatereh" /> },
      { path: "khatereh/:slug", element: <StreamDetailPage kind="khatereh" /> },
      { path: "gozaresh", element: <StreamPage kind="gozaresh" /> },
      { path: "gozaresh/:slug", element: <StreamDetailPage kind="gozaresh" /> },
      { path: "bayan", element: <StreamPage kind="bayan" /> },
      { path: "bayan/:slug", element: <StreamDetailPage kind="bayan" /> },
      { path: "poll", element: <PollPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "roadmap", element: <RoadmapPage /> },
      { path: "design", element: <DesignPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);