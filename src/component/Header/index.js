import { Box, Button, Drawer } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useWallet } from "@suiet/wallet-kit";
import Link from "next/link";
import { useRouter } from "next/router";
import { memo, useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import useIsMobile from "../../hooks/useIsMobile";
import { setSignWalletPopupOpen } from "../../redux/slices/layout";
import { formatWalletAddress, openLink } from "../../utils/common";
import WalletConnectModal from "./WalletConnectModal";
import styles from "./style";
import useWalletConnection from "../hooks/useWalletConnection";
import CreateAgentModal from "../CreateAgentModal";

const LogOutNavItem = [
  {
    path: "/",
    title: "Build",
    icon: "/images/fantv/menu/reward.svg",
    newTag: true,
  },
  {
    path: "https://marketplace.agentnation.xyz/",
    title: "Marketplace",
    icon: "/images/fantv/menu/reward.svg",
    newTag: false,
  },
];

const RevampHeader = ({ app }) => {
  const wallet = useWallet();
  const { walletState } = useWalletConnection();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [walletAnchorEl, setWalletAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const layoutData = useSelector((state) => state.layout);
  const [airdropPoints, setAirdropPoints] = useState(layoutData.airdropPoints);

  useEffect(() => {
    setAirdropPoints(layoutData.airdropPoints);
  }, [layoutData?.airdropPoints]);

  useEffect(() => {
    setWalletAnchorEl(layoutData.isSignWalletPopupOpen);
  }, [layoutData?.isSignWalletPopupOpen]);

  const handleWalletClick = (event) => {
    event.stopPropagation();
    setWalletAnchorEl(event.currentTarget);
  };

  const handleWalletClose = () => {
    setWalletAnchorEl(null);
    dispatch(setSignWalletPopupOpen(false));
  };

  const router = useRouter();
  const dispatch = useDispatch();

  const isLoggedIn = false;
  const isMobile = useIsMobile(app?.deviceParsedInfo?.device?.isMobile);

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setIsMenuOpen(open);
  };

  const isWalletConnected = useMemo(() => {
    if (walletState.status == "connected") {
      return true;
    } else {
      return false;
    }
  }, [walletState, walletState?.state]);

  const drawerContent = (
    <Box
      sx={{
        width: 250,
        height: "100%",
        // background: "#1E1E1E", // Dark background for drawer
        color: "#FFFFFF", // Light text for contrast
        backdropFilter: "blur(40px)",
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box
        display="flex"
        sx={{ gap: 2, alignItems: "center", padding: 2 }}
        onClick={toggleDrawer(false)}
      >
        <img style={{ height: "32px", width: "32px" }} src="/images/close.svg" />
      </Box>
      <Box sx={styles.mobileScroll}>
        <Box
          display="block"
          sx={{
            gap: "10px",
            flexDirection: "column",
            alignItems: "center",
            padding: 2,
            borderBottom: "1px solid #333333",
          }}
        >
          {/* <Box sx={styles.pointContainer}>
            <img
              style={{ width: "24px", height: "24px", marginRight: "8px" }}
              src="/images/seasonIcon.png"
              alt="icon"
            />
            <Typography
              variant="h6"
              sx={{
                color: "#FFFFFF", // Light text color
                fontFamily: "Nohemi",
                fontSize: "16px",
                fontWeight: 500,
              }}
            >
              {airdropPoints}
            </Typography>
          </Box> */}
        </Box>
        {LogOutNavItem?.map((item, i) => (
          <Link key={i} prefetch={false} href={item?.path} passHref>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              padding={2}
              borderBottom="1px solid #333333"
              onClick={() => {
                setIsMenuOpen(false);
              }}
            >
              <Typography
                variant="h6"
                className="nav-item"
                sx={{
                  color: "#FFFFFF", // Highlight active item
                  fontFamily: "Nohemi",
                  fontSize: "16px",
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {item?.title}
                {item.newTag && (
                  <Box
                    sx={{
                      marginLeft: "10px",
                      backgroundColor: "#CCFF00",
                      padding: "2px 5px",
                      borderRadius: "10px",
                      fontSize: "8px",
                      fontWeight: 700,
                      color: "#000",
                      textAlign: "center",
                      display: "inline-block",
                    }}
                  >
                    Coming Soon
                  </Box>
                )}
              </Typography>
            </Box>
          </Link>
        ))}
      </Box>
    </Box>
  );

  return (
    <>
      <Box
        sx={{
          ...styles.navbar,
          color: "#FFFFFF",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <CreateAgentModal open={open} handleClose={() => setOpen(false)} />

        <Box className="nav-container">
          <Box display="flex">
            <Box
              className="nav-logo"
              onClick={() =>
                window?.open(process.env.NEXT_PUBLIC_REDIRECT_URL, "_self", "noopener,noreferrer")
              }
            >
              {isMobile ? (
                <Box className="fan__TigerMobileLogo">
                  <img
                    src={"/images/ai/aiNationLogo.svg"}
                    style={{ height: "40px", width: "180px" }}
                    alt="mobile AI Nation logo"
                    loading="eager"
                    decoding="async"
                  />
                </Box>
              ) : (
                <Box className="fan__tigerDekstopLogo">
                  <img
                    src={"/images/ai/aiNationLogo.svg"}
                    alt="AI Nation Logo"
                    width={200}
                    style={{ height: "60px", width: "290px" }}
                    loading="eager"
                    decoding="async"
                  />
                </Box>
              )}
            </Box>
          </Box>
          <Box sx={{ alignItems: "center", display: "flex" }}>
            {!isMobile && (
              <Box display="flex" sx={{ gap: 2, alignItems: "center" }}>
                <Box
                  display={"flex"}
                  height={"auto"}
                  gap="20px"
                  alignItems="center"
                  className="cursor-pointer"
                >
                  {["Trade"].map((label) => (
                    <Typography
                      key={label}
                      variant="h6"
                      className="nav-item"
                      sx={{
                        color: "#FFFFFF",
                        display: "flex",

                        fontSize: "16px",
                      }}
                    >
                      {label}
                    </Typography>
                  ))}
                  <Typography
                    variant="h6"
                    className="nav-item"
                    onClick={() => setOpen(true)}
                    sx={{
                      color: "#FFFFFF",
                      display: "flex",

                      fontSize: "16px",
                    }}
                  >
                    Create agent
                  </Typography>
                  <Typography
                    onClick={() => openLink("https://marketplace.agentnation.xyz")}
                    variant="h6"
                    className="nav-item"
                    sx={{
                      color: "#FFF",
                      display: "flex",

                      fontSize: "16px",
                      cursor: "pointer",
                    }}
                  >
                    Marketplace
                  </Typography>
                  <Typography
                    variant="h6"
                    className="nav-item"
                    sx={{
                      color: "#FFF",
                      display: "flex",
                      fontSize: "16px",
                      cursor: "pointer",
                    }}
                  >
                    Build
                    <Box
                      sx={{
                        marginLeft: "10px",
                        height: "max-content",
                        backgroundColor: "#CCFF00",
                        padding: "2px 5px",
                        borderRadius: "10px",
                        fontSize: "8px",
                        fontWeight: 700,
                        color: "#000",
                        textAlign: "center",
                        display: "inline-block",
                      }}
                    >
                      Coming Soon
                    </Box>
                  </Typography>
                </Box>
              </Box>
            )}

            <Box sx={styles.btnContainer} onClick={handleWalletClick}>
              <img src="/images/rocket-launch.svg" />
              {isWalletConnected ? (
                <Button
                  sx={{
                    fontSize: "16px",
                  }}
                >
                  {formatWalletAddress(walletState?.address, 4)}
                </Button>
              ) : (
                <Button
                  sx={{
                    color: "#000000",
                    fontSize: "16px",
                  }}
                >
                  Connect Wallet
                </Button>
              )}
            </Box>
            <WalletConnectModal anchorEl={walletAnchorEl} onClose={handleWalletClose} />
          </Box>
          {isMobile && (
            <Box sx={styles.profileNavBar} onClick={toggleDrawer(true)}>
              <img src="/images/menu.svg" />
            </Box>
          )}

          {/* )} */}
          <Drawer anchor="right" open={isMenuOpen} onClose={toggleDrawer(false)}>
            {drawerContent}
          </Drawer>
        </Box>
      </Box>
    </>
  );
};

export default memo(RevampHeader);
