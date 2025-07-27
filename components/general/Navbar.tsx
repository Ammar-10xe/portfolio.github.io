import {
  Button,
  Divider,
  HStack,
  Icon,
  LinkBox,
  LinkOverlay,
  Text,
  VStack,
  useColorModeValue,
  useMediaQuery,
} from "@chakra-ui/react";
import { FaWhatsapp, FaGithub, FaLinkedin } from "react-icons/fa";
import Logo from "./Logo";
import profile from "@/data/profile.json";
import ColorModeButton from "./ColorModeButton";
import InternalLink from "./InternalLink";

const { github, whatsapp, linkedIn } = profile.socialMedia;

export default function Navbar() {
  const primaryColor = useColorModeValue("gray.3", "gray.4");
  const iconColor = useColorModeValue("gray.600", "gray.200");
  const [isMobile] = useMediaQuery("(max-width: 592px)");

  function headerLink(route: string, text: string) {
    return (
      <InternalLink href={route} color={primaryColor} thickness="2px">
        <Text
          variant="strong"
          fontSize={{
            base: "14px",
            sm: "15px",
            md: "16px",
            lg: "18px",
            xl: "20px",
            "2xl": "24px",
          }}
        >
          {text}
        </Text>
      </InternalLink>
    );
  }

  function socialIcon(route: string, icon: any) {
    return (
      <LinkBox>
        <Button padding="0" minW="1.5rem" minH="1.5rem" height="min" bgColor="transparent">
          <LinkOverlay href={route} isExternal>
            <Icon
              as={icon}
              boxSize={{
                base: "1.5rem",
                sm: "1.6rem",
                md: "1.75rem",
                lg: "1.9rem",
                xl: "2rem",
                "2xl": "2.25rem",
              }}
              color={iconColor}
            />
          </LinkOverlay>
        </Button>
      </LinkBox>
    );
  }

  function displayHeader() {
    if (isMobile) {
      return (
        <VStack width="full">
          <HStack width="full" justifyContent="space-between">
            <Logo />
            <HStack spacing={{ base: "0.75rem", sm: "1rem" }}>
              {socialIcon(github, FaGithub)}
              {socialIcon(whatsapp, FaWhatsapp)}
              {socialIcon(linkedIn, FaLinkedin)}
              <ColorModeButton />
            </HStack>
          </HStack>
          <Divider />
          <HStack
            width={{ base: "full", sm: "80vw" }}
            alignSelf="center"
            justifyContent="space-around"
          >
            {headerLink("/", "Home")}
            {headerLink("/about", "About")}
            {headerLink("/projects", "Projects")}
            {headerLink("/contact-me", "Contact")}
          </HStack>
          <Divider />
        </VStack>
      );
    } else {
      return (
        <HStack width="full" justifyContent="space-between">
          <Logo />
          <HStack
            spacing={{
              base: "0.5rem",
              md: "1rem",
              lg: "2rem",
              xl: "3rem",
              "2xl": "4rem",
            }}
          >
            {headerLink("/", "Home")}
            {headerLink("/about", "About")}
            {headerLink("/projects", "Projects")}
            {headerLink("/contact-me", "Contact")}
            <HStack
              spacing={{
                base: "0.5rem",
                md: "0.75rem",
                lg: "0.9rem",
                xl: "1rem",
                "2xl": "1.25rem",
              }}
            >
              {socialIcon(whatsapp, FaWhatsapp)}
              {socialIcon(github, FaGithub)}
              {socialIcon(linkedIn, FaLinkedin)}
              <ColorModeButton />
            </HStack>
          </HStack>
        </HStack>
      );
    }
  }

  return displayHeader();
}
