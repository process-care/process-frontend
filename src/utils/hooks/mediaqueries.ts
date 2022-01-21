import { useMediaQuery } from "@chakra-ui/react";
import { mobile, tablet, desktop, bigScreen, extraBigScreen } from "theme";

interface MediaQueries {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isBigScreen: boolean;
  isExtraBigScreen: boolean;
}

export function useMediaQueries(): MediaQueries {
  const [isMobile] = useMediaQuery(`(max-width: ${mobile})`);
  const [isTablet] = useMediaQuery(`(max-width: ${tablet})`);

  const [isDesktop] = useMediaQuery(`(max-width: ${desktop})`);

  const [isBigScreen] = useMediaQuery(`(max-width: ${bigScreen})`);
  const [isExtraBigScreen] = useMediaQuery(`(max-width: ${extraBigScreen})`);

  return { isMobile, isTablet, isDesktop, isBigScreen, isExtraBigScreen };
}
