import { useAppContext } from "@/context/state";
import { getGradientFlow } from "@/utils/gradient";
import { GRADIENT_FLOW_DURATION } from "@/utils/motion";
import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  LinkBox,
  LinkOverlay,
  Text,
  VStack,
  keyframes,
  useColorModeValue,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

// Keyframes for the gradient text animation
const shift = keyframes`
  from {
    background-position: 100% 50%;
  }
  to {
    background-position: 0% 50%;
  }
`;
const gradientFlowAnimation = `${shift} ${GRADIENT_FLOW_DURATION} linear infinite`;

// Keyframes for the flashing icon animation
const flash = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
`;
const iconFlashAnimation = `${flash} 1.5s ease-in-out infinite`; // Flash every 1.5 seconds

// Motion components for smoother animations
const MotionFlex = motion(Flex);
const MotionVStack = motion(VStack);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionButton = motion(Button); // Still used for hover effects on individual links
const MotionIcon = motion(Icon); // Motion version of Icon
const MotionBox = motion(Box); // Added definition for MotionBox

// Simple Mail Icon SVG
const MailIcon = (props) => (
  <MotionIcon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
    />
  </MotionIcon>
);

// Simple Phone Icon SVG
const CallIcon = (props) => (
  <MotionIcon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.32.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
    />
  </MotionIcon>
);

export default function ContactMe() {
  const { gradientTheme } = useAppContext();
  const gradient = getGradientFlow(gradientTheme, "to right");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const cardBg = useColorModeValue("white", "gray.800");
  const cardBorder = useColorModeValue("gray.200", "gray.700");

  return (
    <Container maxW="8xl" pt={{ base: 16, md: 24 }} pb={32}>
      {/* Main content area with a responsive flex layout */}
      <MotionFlex
        direction="column" // Changed to column to place heading at the top
        align="center"
        justify="center"
        gap={{ base: 8, md: 16 }}
        p={{ base: 8, md: 16 }}
        borderRadius="2xl"
        bg={cardBg} // This is the main large rectangular box
        boxShadow="xl"
        border="1px solid"
        borderColor={cardBorder}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Top Section: Main Heading */}
        <MotionHeading
          size={{ base: "2xl", md: "3xl", lg: "4xl" }}
          fontWeight="extrabold"
          lineHeight="shorter"
          textAlign="center" // Ensure it's centered
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
        >
           Let&apos;s Connect Together. {/* New tagline, single line */}
        </MotionHeading>

        {/* Content Row: Introduction Text and Contact Details */}
        <Flex
          direction={{ base: "column", md: "row" }} // Stacks on mobile, row on desktop
          align="flex-start" // Align items to the start of the flex container
          justify="space-between" // Distribute space between the two columns
          w="full" // Take full width of the parent MotionFlex
          gap={{ base: 8, md: 16 }} // Gap between the two columns
        >
          {/* Left Column: Introduction Text */}
          <MotionVStack
            align="flex-start" // Align text to the left
            spacing={1}
            flex="2"
            maxW={{ base: "full", md: "50%" }}
            textAlign="center" // Ensure text is left-aligned
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
          >
            <MotionText
              fontSize={{ base: "lg", md: "xl" }}
              color={textColor}
              textAlign="center" // Explicitly ensure left alignment for all lines
            >
              I'm actively seeking impactful roles in <Text as="span" fontWeight="bold">Functional Verification Engineer</Text>. Whether you have a challenging project, a career opportunity, or just want to discuss the future of tech, I'm eager to connect.
            </MotionText>
          </MotionVStack>

          {/* Right Column: Email/Phone Call to Action */}
          <MotionVStack
            align="flex-start" // Ensures items within this VStack align to the start (left)
            spacing={6}
            flex="1"
            maxW={{ base: "full", md: "50%" }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
          >
            {/* Combined Email and Phone Contact on one line */}
            <HStack
              spacing={{ base: 4, md: 6 }} // Spacing between email and phone
              wrap="wrap" // Allow wrapping on smaller screens if they don't fit
              justify={{ base: "center", md: "flex-start" }} // Center on mobile, left-align on desktop
              w="full"
            >
              {/* Email Contact */}
              <MotionBox
                as={LinkBox}
                href="mailto:ammark561@gmail.com"
                padding={{ base: 2, md: 3 }} // Slightly reduced padding for horizontal fit
                borderRadius="lg"
                _hover={{
                  bg: useColorModeValue("gray.100", "gray.700"),
                  transform: "translateY(-3px)",
                  boxShadow: "md",
                }}
                transition="all 0.3s ease-in-out"
                display="flex"
                justifyContent="flex-start" // Ensures content within this Box aligns to the start (left)
                flexShrink={0} // Prevent shrinking
              >
                <LinkOverlay href="mailto:ammark561@gmail.com">
                  <HStack spacing={2} align="center" justify="flex-start"> {/* Ensures HStack content aligns to the start (left) */}
                    <MailIcon
                      boxSize={{ base: 8, md: 9 }} // Further adjusted icon size for horizontal fit
                      color={useColorModeValue("blue.500", "blue.300")}
                      animation={iconFlashAnimation}
                    />
                    <MotionHeading
                      bg={gradient}
                      bgClip="text"
                      bgSize="300% 100%"
                      bgPosition="right"
                      textColor="transparent"
                      animation={gradientFlowAnimation}
                      fontSize={{ base: "md", sm: "lg", md: "xl" }} // Adjusted text size to fit
                      fontWeight="extrabold"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      lineHeight="tight"
                    >
                      ammark561@gmail.com
                    </MotionHeading>
                  </HStack>
                </LinkOverlay>
              </MotionBox>

              {/* Phone Contact */}
              <MotionBox
                as={LinkBox}
                href="tel:+923054059832"
                padding={{ base: 2, md: 3 }} // Slightly reduced padding for horizontal fit
                borderRadius="lg"
                _hover={{
                  bg: useColorModeValue("gray.100", "gray.700"),
                  transform: "translateY(-3px)",
                  boxShadow: "md",
                }}
                transition="all 0.3s ease-in-out"
                display="flex"
                justifyContent="flex-start" // Ensures content within this Box aligns to the start (left)
                flexShrink={0} // Prevent shrinking
              >
                <LinkOverlay href="tel:+923054059832">
                  <HStack spacing={2} align="center" justify="flex-start"> {/* Ensures HStack content aligns to the start (left) */}
                    <CallIcon
                      boxSize={{ base: 8, md: 9 }} // Further adjusted icon size for horizontal fit
                      color={useColorModeValue("green.500", "green.300")}
                      animation={iconFlashAnimation}
                    />
                    <MotionHeading
                      bg={gradient}
                      bgClip="text"
                      bgSize="300% 100%"
                      bgPosition="right"
                      textColor="transparent"
                      animation={gradientFlowAnimation}
                      fontSize={{ base: "md", sm: "lg", md: "xl" }} // Adjusted text size to fit
                      fontWeight="extrabold"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      lineHeight="tight"
                    >
                      +92 305 4059832
                    </MotionHeading>
                  </HStack>
                </LinkOverlay>
              </MotionBox>
            </HStack>

            <Text fontSize={{ base: "sm", md: "md" }} color={textColor} opacity={0.7} pt={2}
              textAlign="left" // Ensures this text aligns to the left
            >
              {/* Click to connect directly */}
            </Text>
          </MotionVStack>
        </Flex>
      </MotionFlex>
    </Container>
  );
}
