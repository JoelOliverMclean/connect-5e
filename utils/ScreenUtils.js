import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "@/tailwind.config.mjs";

const fullConfig = resolveConfig(tailwindConfig);

const isBreakpoint = (breakpoint) => {
  const currentWidth = window.innerWidth;
  const breakpointWidth = parseInt(fullConfig.theme.screens[breakpoint], 10);
  if (currentWidth >= breakpointWidth) {
    return true;
  } else {
    return false;
  }
};

export { isBreakpoint };
