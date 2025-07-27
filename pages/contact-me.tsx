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
  useToken,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const shift = keyframes`
  from {
    background-position: 100% 50%;
  }
  to {
    background-position: 0% 50%;
  }
`;
const gradientFlowAnimation = `${shift} ${GRADIENT_FLOW_DURATION} linear infinite`;

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);

export default function ContactMe() {
  const { gradientTheme } = useAppContext();
  const gradient = getGradientFlow(gradientTheme, "to right");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const [gray200] = useToken("colors", ["gray.200"]);

  return (
    <Container maxW="6xl" py={{ base: 20, md: 32 }} position="relative">
      {/* Background Rectangle */}
      <MotionBox
        position="absolute"
        top={{ base: 8, md: 16 }}
        left={0}
        right={0}
        bottom={0}
        bg={useColorModeValue("gray.50", "gray.800")}
        borderRadius="2xl"
        boxShadow="lg"
        zIndex={0}
        mx={4}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      />

      <MotionVStack
        spacing={10}
        align="center"
        zIndex={1}
        position="relative"
        px={{ base: 4, md: 16 }}
      >
        <MotionHeading
          size={{ base: "2xl", md: "3xl", lg: "4xl" }}
          textAlign="center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Let&apos;s Connect Together
        </MotionHeading>

        <MotionText
          fontSize={{ base: "lg", md: "xl" }}
          color={textColor}
          textAlign="center"
          maxW="3xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          I&apos;m actively seeking impactful roles as a {" "}
          <Text as="span" fontWeight="bold">
            Functional Verification Engineer
          </Text>
          . Whether you have a challenging project, a career opportunity, or
          just want to discuss the future of tech, I&apos;m eager to connect.
        </MotionText>

        <MotionVStack
          spacing={6}
          align="center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <ContactCTA
            href="tel:+923054059832"
            label="+92 305 4059832"
            gradient={gradient}
            animation={gradientFlowAnimation}
          />
          <ContactCTA
            href="mailto:ammark561@gmail.com"
            label="ammark561@gmail.com"
            gradient={gradient}
            animation={gradientFlowAnimation}
          />
        </MotionVStack>
      </MotionVStack>
    </Container>
  );
}

function ContactCTA({
  href,
  label,
  gradient,
  animation,
}: {
  href: string;
  label: string;
  gradient: string;
  animation: string;
}) {
  return (
    <HStack>
      <Button
        as={LinkBox}
        variant="unstyled"
        padding="0"
        _hover={{ transform: "scale(1.05)" }}
        _active={{ transform: "scale(0.95)" }}
      >
        <MotionHeading
          as="h3"
          fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
          fontWeight="extrabold"
          bg={gradient}
          bgClip="text"
          bgSize="300% 100%"
          bgPosition="right"
          textColor="transparent"
          animation={animation}
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.3 }}
        >
          <LinkOverlay href={href}>{label}</LinkOverlay>
        </MotionHeading>
      </Button>
    </HStack>
  );
}
