import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { Resources } from "./pages/Resources";
import { Assessment } from "./pages/Assessment";
import { Community } from "./pages/CommunityNew";
import { Crisis } from "./pages/Crisis";
import { DesignFrames } from "./pages/DesignFrames";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Profile } from "./pages/Profile";
import { Layout } from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/sign-in",
    Component: SignIn,
  },
  {
    path: "/sign-up",
    Component: SignUp,
  },
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "resources", Component: Resources },
      { path: "assessment", Component: Assessment },
      { path: "community", Component: Community },
      { path: "crisis", Component: Crisis },
      { path: "profile", Component: Profile },
      { path: "design-frames", Component: DesignFrames },
    ],
  },
]);